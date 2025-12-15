import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { use } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../Components/Context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

const UpdateProduct = () => {
    const { id } = useParams()
    const { userInfo, dbUserInfo, backServerUrl } = use(AuthContext)
    const [productData, setProductData] = useState([])
    const [prodLoaded, setProdLoaded] = useState(true)
    const [images, setImages] = useState([]);
    const [dataPosting, setDataPosting] = useState(false)
    const [cod, setCod] = useState(false)
    const [onPay, setOnPay] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${backServerUrl}/SingleProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setProductData(data)
                setImages([...data.images])
                setCod(data.cod)
                setOnPay(data.onlinePay)
                console.log(data)
                setProdLoaded(false)
            })
    }, [backServerUrl, id])


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 4) {
            Swal.fire({
                icon: "error",
                title: "Maximum 4 Photo",
                text: "You can upload a maximum of 4 images.",
            });
            return;
        }
        

        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setImages(imagePreviews);
    };



    const uploadImagesToImgBB = async (files) => {
        const uploadedUrls = [];
        setDataPosting(true)

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const formData = new FormData();
                formData.append("image", file);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageBB_Creds}`,
                    { method: "POST", body: formData }
                );

                const data = await res.json();
                console.log("ImgBB response:", data);

                if (data.success && data.data?.url) {
                    uploadedUrls.push(data.data.url);
                } else {
                    console.error(`Failed to upload file: ${file.name}`, data.error?.message);
                }
            } catch (err) {
                console.error(`Error uploading file: ${file.name}`, err);
            }
        }

        return uploadedUrls;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (dbUserInfo.status !== "normal") {
            Swal.fire({
                icon: "error",
                title: "Account Pending Error",
                text: "Your account is not approved to create post, wait for Admin to approve it.",
            });
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!"
        });

        if (!result.isConfirmed) {
            console.log("User cancelled");
            return;
        }



        const files = e.target.images.files;
        const urls = await uploadImagesToImgBB(Array.from(files));

        const now = new Date();
        const type = e.target.type.value;
        const PerPrice = Number(e.target.PerPrice.value);
        const Available = Number(e.target.Available.value);
        const Minimum = Number(e.target.Minimum.value);
        const CashOnDelivery = e.target.CashOnDelivery.checked;
        const OnlinePay = e.target.OnlinePay.checked;
        const ShowHome = e.target.ShowHome.checked;
        const Title = e.target.Title.value;
        const description = e.target.description.value;

        if (urls.length < 1) {
            Swal.fire({
                icon: "error",
                title: "Minimum 1 Image",
                text: "You need to upload minimum 1 image .",
            });
            return;
        }

        const procductDetails = {
            id: id,
            category: type,
            perPrice: PerPrice,
            totalQuanity: Available,
            availableQuanity: Available,
            minimumOrder: Minimum,
            cod: CashOnDelivery,
            onlinePay: OnlinePay,
            showHome: ShowHome,
            title: Title,
            description,
            images: urls,
            status: "normal",
            createdBy: userInfo.email,
            createdAt: now.toISOString()
        };

        // POST to backend
        try {
            const res = await fetch(`${backServerUrl}/UpdatePost`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify(procductDetails)
            });

            const data = await res.json();
            console.log("Data Posted:", data);
            Swal.fire({
                title: "Update!",
                text: "Product has been successfully updated!",
                icon: "success"
            });
            setImages([])
            e.target.reset();
            navigate(backServerUrl?.accountType === "Manager" ? "/Dashboard/Manager" : "/Dashboard/Admin")

        } catch (err) {
            console.log("Got Error While Posting:", err);
        }

        setDataPosting(false);
        console.log("FINAL PRODUCT:", procductDetails);
    };

    if (prodLoaded) {
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <span className="loading scale-125 loading-spinner text-purple-600"></span>
        </div>
    }


    return (

        <div className='max-w-[1440px] mx-auto flex items-center flex-col gap-2 mt-20 relative'>

            <div className="flex justify-between w-[900px] items-center">
                <h1 className='text-2xl font-semibold'>Create Post</h1>
                <span className='text-sm flex items-center bg-white theme-text-black p-2 rounded-md shadow'>Home <ChevronRight size={16} /> Create Post</span>
            </div>

            <div className="flex gap-3 flex-wrap">
                <PhotoProvider>
                    {images.map((img, index) => (
                        <PhotoView src={img} key={index}>

                            <img
                                key={index}
                                src={img}
                                alt="preview"
                                className="w-24 h-24 object-cover rounded-md border"
                            />
                        </PhotoView>

                    ))}
                </PhotoProvider>
            </div>

            <div className="card-body bg-white w-fit rounded-lg shadow">
                <form className=' text-left' onSubmit={handleSubmit}>
                    <div className="flex gap-10">
                        <fieldset className="fieldset">
                            <label className="label">Banner Image*</label>
                            <input required onChange={handleImageChange} name="images" type="file" multiple accept="image/*" className="file-input theme-text-black font-normal" />

                            <label className="label">Select Category*</label>
                            <select name="type" className="select theme-text-black" required defaultValue={productData.category}>
                                <option value="" disabled>Pick a Category</option>
                                <option value="Shirt">Shirt</option>
                                <option value="Pant">Pant</option>
                                <option value="T-Shirt">T-Shirt</option>
                                <option value="Hoodie">Hoodie</option>
                                <option value="Jacket">Jacket</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Formal Shirt">Formal Shirt</option>
                                <option value="Sweater">Sweater</option>
                            </select>


                            <label className="label">Price Per Item (USD)*</label>
                            <input required name='PerPrice' type="number" className="input theme-text-black" placeholder="10$" defaultValue={productData.perPrice} />

                            <label className="label">Avaiable Quantity*</label>
                            <input required name='Available' type="number" className="input theme-text-black" placeholder="1000/5000/10000" defaultValue={productData.availableQuanity} />

                            <label className="label">Minimum Order Quantity*</label>
                            <input required name='Minimum' type="number" className="input theme-text-black" placeholder="100/500/1000" defaultValue={productData.minimumOrder} />


                            <label className="label mt-2">Allowed Payment Methode</label>
                            <div className="flex gap-5">
                                <div className="">
                                    {
                                        console.log("cod:", cod, "Online Pay:", onPay)
                                    }
                                    <label className="label">
                                        <input name="CashOnDelivery" type="checkbox" defaultChecked={true} className="checkbox" />
                                        Cash On Delivery
                                    </label>
                                </div>
                                <div className="">
                                    <label className="label">
                                        <input name="OnlinePay" type="checkbox" defaultChecked={true} className="checkbox" />
                                        Online Pay
                                    </label>
                                </div>

                            </div>

                            <div className="">
                                <label className="label">
                                    <input name="ShowHome" type="checkbox" defaultChecked={false} className="checkbox" />
                                    Show on Home "/"
                                </label>
                            </div>

                        </fieldset>

                        <fieldset className="fieldset">

                            <label className="label">Title*</label>
                            <input required name='Title' type="text" className="input w-[500px] theme-text-black" defaultValue={productData.title} placeholder="Title Text" />


                            <label className="label">Description*</label>
                            <textarea required name='description' defaultValue={productData.description} className="textarea min-h-80 w-[500px]  theme-text-black" placeholder="Product Description"></textarea>
                        </fieldset>
                    </div>
                    <button className="btn theme-btn text-left mt-4 px-10">Submit</button>
                </form>
            </div>

            <div className={` ${dataPosting ? "visible" : "hidden"} absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-md flex justify-center items-center`}>
                <span className="loading loading-spinner text-purple-600 scale-200"></span>
            </div>

        </div>
    );
};

export default UpdateProduct;