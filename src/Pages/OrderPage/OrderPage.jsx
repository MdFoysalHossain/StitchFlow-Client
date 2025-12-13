import React, { use, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Components/Context/AuthContext';
import { ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2'

const OrderPage = () => {
    const { id } = useParams();
    const { backServerUrl, dbUserInfo } = use(AuthContext)
    const [productData, setProductData] = useState()
    const [productLoading, setProductLoading] = useState(true)
    const [quantityErr, setQuantityErr] = useState(false)
    const [paymentType, setPaymentType] = useState()
    const navigate = useNavigate()

    const [minOrder, setMinOrder] = useState(0)
    const [totalCounted, setTotalCounted] = useState(0)

    useEffect(() => {
        fetch(`${backServerUrl}/SingleProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setProductData(data)
                setProductLoading(false)

                console.log("Got Data:", data)
            })
    }, [backServerUrl, id])


    if (dbUserInfo?.accountType === "Manager" || dbUserInfo?.accountType === "Admin") { // This Will be "Manager"
        return navigate(`/SingleProduct/${id}`)
    }


    const handleQuantityChange = (e) => {
        const quantity = Number(e.target.value);

        const check = quantity < productData?.minimumOrder || quantity > productData?.availableQuanity
        const total = productData?.perPrice * quantity
        // console.log("Quantity Checked:", quantity, "\nCheck:", check)
        setMinOrder(quantity)
        setTotalCounted(total)
        setQuantityErr(check)

        console.log("Total quantity:", quantity, "\nPer Price:", productData?.perPrice, "\nTotal:", total, "\nTotal Counted", totalCounted)
    }

    const handleCodChange = () => {
        setPaymentType("cod")
    }

    const handleOnlinePay = () => {
        setPaymentType("stripe")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        function getRandomText(length) {
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }

        const randomText = getRandomText(15);




        const productId = id;
        const productTitle = productData?.title;
        const sellerEmail = productData?.createdBy;
        const productPerPrice = productData?.perPrice;
        const productOrderQuantity = minOrder;
        const productTotalPrice = totalCounted;

        const userFirstName = e.target.firstName.value;
        const userLastName = e.target.lastName.value;
        const userEmail = dbUserInfo?.email;
        const userContact = e.target.contactNumber.value;
        const userAddress = e.target.address.value;
        const userNote = e.target.note.valye;
        const paymentStatus = paymentType === "cod" ? "Cash On Delivery" : "Paid"

        const allData = {
            productId: productId,
            title: productTitle,
            perPrice: productPerPrice,
            total: productTotalPrice,
            minimumOrder: productOrderQuantity,
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            contact: userContact,
            address: userAddress,
            note: userNote,
            checkPrevOrder: randomText,
            paymentStatus: paymentStatus,
            status: "pending",
            sellerEmail: sellerEmail
        }
        console.log(allData)

        if (!paymentType) {
            Swal.fire({
                icon: "error",
                title: "Payment Methode",
                text: "Please select a payment methode to place the order.",
            });
            return;
        }

        // 🔥 WAIT for user choice
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Place Order!"
        });

        if (!result.isConfirmed) {
            console.log("User cancelled");
            return;
        }

        if (paymentType === "cod") {
            console.log("Entered COD")
            fetch(`${backServerUrl}/create-checkout-session`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(allData)
            })
                .then(res => res.json())
                .then(data => {
                    return navigate(`/Payment/Payment-successful`)
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        }


        if (paymentType === "stripe") {
            console.log("Stripe Pay Started");

            fetch(`${backServerUrl}/create-checkout-session`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(allData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.url) {
                        console.log(data.url)
                        window.location.href = data.url;
                    } else {
                        console.error("Stripe session creation failed:", data);
                    }
                })
                .catch(err => {
                    console.error("Error:", err);
                });
        }

    }

    const handleSuspended = () => {
        Swal.fire({
                title: "Account Suspended",
                text: "Your account is suspended, please contant the admin for further details!",
                icon: "error"
            });
    }

    return (
        <div className='max-w-[1440px] mx-auto flex items-center flex-col gap-2 mt-20 relative'>

            <div className="flex justify-between w-[900px] items-center">
                <h1 className='text-2xl font-semibold max-w-[500px] text-left'><span className='theme-text'>Order</span> - {productData?.title} Black & Gray Leather Women's Jacket</h1>
                <span className='text-sm flex items-center bg-white theme-text-black p-2 rounded-md shadow'>Home <ChevronRight size={16} /> Product <ChevronRight size={16} /> Order</span>
            </div>
            <div className="card-body bg-white w-fit rounded-lg shadow">
                <form onSubmit={handleSubmit} className=' text-left w-[860px]'>
                    <div className="flex justify-between gap-10">
                        <fieldset className="fieldset">
                            <label className="label">Product Id</label>
                            <input required name='prodcutId' type="text" readOnly className="input w-[350px] theme-text-black" defaultValue={id} />
                            <label className="label">Product Title</label>
                            <input required name='prodcutTitle' type="text" readOnly className="input w-[350px] theme-text-black" defaultValue={productData?.title} />

                            <label className="label">Price Per Product in $ (USD)</label>
                            <input required name='pricePerProduct' type="text" readOnly className="input w-[350px] theme-text-black" defaultValue={productData?.perPrice} />

                            <label className="label">Order Quantity</label>
                            <input onChange={handleQuantityChange} required name='Minimum' type="number" className="input w-[350px] theme-text-black" placeholder={`Min: ${productData?.minimumOrder} Available: ${productData?.availableQuanity}`} />
                            <p className={`${quantityErr ? "visible" : "hidden"} text-red-500`}>{`Min: ${productData?.minimumOrder} Available: ${productData?.availableQuanity}`}</p>


                            <label className="label">Total Price in $ (USD)</label>
                            <input name='CalculatedPrice' type="number" readOnly className="input w-[350px] theme-text-black " placeholder={totalCounted} />

                            <label className="label mt-2">Choose Payment Method</label>
                            <div className="flex gap-5">

                                {productData?.cod && (
                                    <div>
                                        <label className="label cursor-pointer gap-2">
                                            <input
                                                onChange={handleCodChange}
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                className="radio"
                                            />
                                            Cash On Delivery
                                        </label>
                                    </div>
                                )}

                                {productData?.onlinePay && (
                                    <div>
                                        <label className="label cursor-pointer gap-2">
                                            <input
                                                onChange={handleOnlinePay}
                                                type="radio"
                                                name="paymentMethod"
                                                value="online"
                                                className="radio"
                                            />
                                            Online Pay
                                        </label>
                                    </div>
                                )}

                            </div>

                            <p className={`${paymentType ? "hidden" : "visible"} text-red-500`}>Please Select Payment Methode</p>

                        </fieldset>

                        <fieldset className="fieldset min-w-[300px]">

                            <div className="flex gap-5">
                                <div className="">
                                    <label className="label">First Name</label>
                                    <input required name='firstName' type="text" className="input theme-text-black" placeholder='First Name' />
                                </div>
                                <div className="">
                                    <label className="label">Last Name</label>
                                    <input required name='lastName' type="text" className="input theme-text-black" placeholder="Last Name" />
                                </div>

                            </div>
                            <label className="label">Buyer Email</label>
                            <input required name='pricePerProduct' type="text" readOnly className="input w-full theme-text-black" defaultValue={dbUserInfo?.email} />

                            <label className="label">Contact Number</label>
                            <input required name='contactNumber' type="number" className="input w-full theme-text-black" placeholder='+8801912345678' />

                            <label className="label">Delivery Address</label>
                            <input required name='address' type="text" className="input  w-full theme-text-black" placeholder='City, Road No, House No' />

                            <label className="label">Additional Notes / Instructions</label>
                            <textarea name='note' className="textarea w-full min-h-[110px]" placeholder="Additional Notes / Instructions"></textarea>


                        </fieldset>


                    </div>
                    <button disabled={dbUserInfo?.status === "pending" || dbUserInfo?.status === "suspended"} className="btn theme-btn text-left mt-4 px-10">Place Order</button>
                    <p className={` ${dbUserInfo?.status === "suspended" ? "visible" : "hidden"} text-red-500 mt-2`}>Your account is suspended, please contant the admin for further details!</p>
                </form>
            </div>

            {/* <div className={` ${dataPosting ? "visible" : "hidden"} absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-md flex justify-center items-center`}>
                <span className="loading loading-spinner text-purple-600 scale-200"></span>
            </div> */}

        </div>
    );
};

export default OrderPage;