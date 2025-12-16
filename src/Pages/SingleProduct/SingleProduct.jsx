import React from 'react';
import { use } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { AuthContext } from '../../Components/Context/AuthContext';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SingleProduct = () => {
    const { id } = useParams();
    const { backServerUrl } = use(AuthContext)
    const [productData, setProductData] = useState()
    const [productLoading, setProductLoading] = useState(true)

    useEffect(() => {
        fetch(`${backServerUrl}/SingleProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setProductData(data)
                setProductLoading(false)

                console.log(data)
            })
    }, [backServerUrl, id])

    if (productLoading) {
        return (
            <div className='w-full h-[50vh] flex justify-center items-center'><span className="loading scale-150 loading-spinner text-purple-600"></span></div>
        )
    }

    return (
        <div className="max-w-[1440px] mx-auto mt-12 px-6">

            <div className="flex flex-col lg:flex-row gap-12">

                <div className="lg:w-[45%] h-fit bg-white backdrop-blur-md rounded-2xl p-6 shadow-md">
                    <Carousel
                        showArrows={false}
                        showThumbs={true}
                        showIndicators={false}
                        useKeyboardArrows={true}
                        infiniteLoop={true}
                        dynamicHeight={false}
                        swipeable={true}
                        thumbWidth={80}
                        className="rounded-xl overflow-hidden"
                    >
                        {productData.images.map((URL, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <img
                                    src={URL}
                                    alt={`product-image-${index}`}
                                    className="object-contain max-h-[450px]"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="flex-1 space-y-6">

                    <div className='text-left'>
                        <h1 className="text-4xl font-bold tracking-tight">
                            {productData.title}
                        </h1>
                        <span className="inline-block mt-3 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {productData.category}
                        </span>
                    </div>

                    <div className="bg-white backdrop-blur rounded-xl p-6 shadow-sm text-left">
                        <h2 className="text-lg font-semibold mb-3 text-black">Description</h2>
                        <p className="leading-relaxed text-gray-700">
                            {productData.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white backdrop-blur-md p-4 rounded-xl shadow">
                            <span className="text-xs text-gray-500 tracking-wide">Available Quantity</span>
                            <p className="text-2xl font-semibold mt-1 text-black">{productData.availableQuanity}</p>
                        </div>

                        <div className="bg-white backdrop-blur-md p-4 rounded-xl shadow">
                            <span className="text-xs text-gray-500 tracking-wide">Minimum Order</span>
                            <p className="text-2xl font-semibold mt-1 text-black">{productData.minimumOrder}</p>
                        </div>

                        <div className="bg-white backdrop-blur-md p-4 rounded-xl shadow">
                            <span className="text-xs text-gray-500 tracking-wide">Price Per Piece</span>
                            <p className="text-2xl font-semibold mt-1 text-black">{productData.perPrice}$</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-3 md:items-end text-left justify-between bg-white backdrop-blur-md p-6 rounded-xl shadow">

                        <div>
                            <span className="text-sm text-gray-600 font-medium">Available Payment Methods</span>

                            <div className="flex  gap-2 mt-3">
                                {productData.cod && (
                                    <p className="bg-gray-100 px-3 py-1 rounded-lg w-fit text-gray-800 shadow-sm">
                                        Cash on Delivery
                                    </p>
                                )}

                                {productData.onlinePay && (
                                    <p className="bg-gray-100 px-3 py-1 rounded-lg w-fit text-gray-800 shadow-sm">
                                        Stipend
                                    </p>
                                )}
                            </div>
                        </div>

                        <Link to={`/OrderProduct/${id}`}
                            className="theme-btn btn"
                        >
                            Order Now
                        </Link>

                    </div>

                </div>
            </div>

        </div>

    );
};

export default SingleProduct;