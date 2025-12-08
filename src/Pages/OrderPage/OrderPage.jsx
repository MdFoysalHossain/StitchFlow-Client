import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Components/Context/AuthContext';
import { ChevronRight } from 'lucide-react';

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


    if (dbUserInfo?.accountType === "Admin") { // This Will be "Manager"
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

    const handleCodChange = (e) => {
        setPaymentType("cod")
    }

    const handleOnlinePay = (e) => {
        setPaymentType("stripe")
    }

    return (
        <div className='max-w-[1440px] mx-auto flex items-center flex-col gap-2 mt-20 relative'>

            <div className="flex justify-between w-[900px] items-center">
                <h1 className='text-2xl font-semibold max-w-[500px] text-left'><span className='theme-text'>Order</span> - {productData?.title} Black & Gray Leather Women's Jacket</h1>
                <span className='text-sm flex items-center bg-white theme-text-black p-2 rounded-md shadow'>Home <ChevronRight size={16} /> Product <ChevronRight size={16} /> Order</span>
            </div>
            <div className="card-body bg-white w-fit rounded-lg shadow">
                <form className=' text-left w-[860px]'>
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
                                    <input required name='prodcutId' type="text" className="input theme-text-black" placeholder='First Name' />
                                </div>
                                <div className="">
                                    <label className="label">Last Name</label>
                                    <input required name='prodcutId' type="text" className="input theme-text-black" placeholder="Last Name" />
                                </div>

                            </div>
                            <label className="label">Buyer Email</label>
                            <input required name='pricePerProduct' type="text" readOnly className="input w-full theme-text-black" defaultValue={dbUserInfo?.email} />

                            <label className="label">Contact Number</label>
                            <input required name='pricePerProduct' type="number" className="input w-full theme-text-black" placeholder='+8801912345678' />

                            <label className="label">Delivery Address</label>
                            <input required name='pricePerProduct' type="text" className="input  w-full theme-text-black" placeholder='City, Road No, House No' />

                            <label className="label">Additional Notes / Instructions</label>
                            <textarea className="textarea w-full min-h-[110px]" placeholder="Additional Notes / Instructions"></textarea>


                        </fieldset>


                    </div>
                    <button className="btn theme-btn text-left mt-4 px-10">Place Order</button>
                </form>
            </div>

            {/* <div className={` ${dataPosting ? "visible" : "hidden"} absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-md flex justify-center items-center`}>
                <span className="loading loading-spinner text-purple-600 scale-200"></span>
            </div> */}

        </div>
    );
};

export default OrderPage;