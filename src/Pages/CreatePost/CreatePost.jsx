import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { use } from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import Swal from 'sweetalert2'
// or via CommonJS

const CreatePost = () => {
    const { userInfo, dbUserInfo, backServerUrl } = use(AuthContext)
    const [images, setImages] = useState([]);
    const [dataPosting, setDataPosting] = useState(false)
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
        if (files.length < 1) {
            Swal.fire({
                icon: "error",
                title: "Minimum 1 Image",
                text: "You need to upload minimum 1 image .",
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

                const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImageBB_Creds}`, {
                    method: "POST",
                    body: formData
                }
                );

                const data = await res.json();
                //console.log("ImgBB response:", data);

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

        // 🔥 WAIT for user choice
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
            //console.log("User cancelled");
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

        const procductDetails = {
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
            const res = await fetch(`${backServerUrl}/CreatePost`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${userInfo.accessToken}`,
                },
                body: JSON.stringify(procductDetails)
            });

            const data = await res.json();
            //console.log("Data Posted:", data);
            // 🟢 User confirmed → continue
            Swal.fire({
                title: "Submitted!",
                text: "Posting product...",
                icon: "success"
            });
            setImages([])
            e.target.reset();

        } catch (err) {
            //console.log("Got Error While Posting:", err);
        }

        setDataPosting(false);
        //console.log("FINAL PRODUCT:", procductDetails);
    };



    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 mt-10 sm:mt-16 relative">
            <title>Create Product Post</title>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <h1 className="text-xl sm:text-2xl font-semibold">Create Post</h1>
                <span className="text-xs sm:text-sm flex items-center bg-white theme-text-black px-3 py-2 rounded-md shadow w-fit">
                    Home <ChevronRight size={16} /> Create Post
                </span>
            </div>

            <div className="flex gap-3 flex-wrap">
                <PhotoProvider>
                    {images.map((img, index) => (
                        <PhotoView key={index} src={img}>
                            <img
                                src={img}
                                alt="preview"
                                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
                            />
                        </PhotoView>
                    ))}
                </PhotoProvider>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6 w-full">
                <form onSubmit={handleSubmit} className="text-left">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

                        <fieldset className="fieldset w-full lg:w-1/2">

                            <label className="label">Banner Image*</label>
                            <input required onChange={handleImageChange} name="images" type="file" multiple accept="image/*" className="file-input w-full theme-text-black font-normal"/>

                            <label className="label">Select Category*</label>
                            <select name="type" className="select w-full theme-text-black" required defaultValue="">
                                <option value="" disabled>Pick a Category</option>
                                <option>Shirt</option>
                                <option>Pant</option>
                                <option>T-Shirt</option>
                                <option>Hoodie</option>
                                <option>Jacket</option>
                                <option>Jeans</option>
                                <option>Formal Shirt</option>
                                <option>Sweater</option>
                            </select>

                            <label className="label">Price Per Item (USD)*</label>
                            <input required name="PerPrice" type="number" placeholder='5/7/10/20' className="input w-full theme-text-black" />

                            <label className="label">Available Quantity*</label>
                            <input required name="Available" type="number" placeholder='500/700/1000/2000' className="input w-full theme-text-black" />

                            <label className="label">Minimum Order Quantity*</label>
                            <input required name="Minimum" type="number" placeholder='500/700/1000/2000' className="input w-full theme-text-black" />

                            <label className="label mt-2">Allowed Payment Method</label>
                            <div className="flex flex-wrap gap-4">
                                <label className="label gap-2">
                                    <input type="checkbox" name="CashOnDelivery" className="checkbox" defaultChecked />
                                    Cash On Delivery
                                </label>
                                <label className="label gap-2">
                                    <input type="checkbox" name="OnlinePay" className="checkbox" defaultChecked />
                                    Online Pay
                                </label>
                            </div>

                            <label className="label mt-2 gap-2">
                                <input type="checkbox" name="ShowHome" className="checkbox" />
                                Show on Home "/"
                            </label>
                        </fieldset>

                        <fieldset className="fieldset w-full lg:w-1/2">
                            <label className="label">Title*</label>
                            <input
                                required
                                name="Title"
                                type="text"
                                className="input w-full theme-text-black"
                                placeholder="Title Text"
                            />

                            <label className="label">Description*</label>
                            <textarea
                                required
                                name="description"
                                className="textarea min-h-[200px] sm:min-h-80 w-full theme-text-black"
                                placeholder="Product Description"
                            />
                        </fieldset>
                    </div>

                    <button className="btn theme-btn mt-6 px-10 w-full sm:w-fit">
                        Submit
                    </button>
                </form>
            </div>

            <div
                className={`${dataPosting ? "visible" : "hidden"} absolute inset-0 bg-white/30 backdrop-blur-md flex justify-center items-center`}
            >
                <span className="loading loading-spinner text-purple-600 scale-150 sm:scale-200"></span>
            </div>
        </div>

    );

};

export default CreatePost;