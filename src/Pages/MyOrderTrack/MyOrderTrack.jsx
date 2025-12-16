import React from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import { use } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { useState } from 'react';

const MyOrderTrack = () => {
    const { id } = useParams()
    const { backServerUrl, userInfo } = use(AuthContext)
    const [product, setProduct] = useState([])
    console.log(id)

    useEffect(() => {
        fetch(`${backServerUrl}/GetSingleOrder/${id}`, { 
            method: "GET", 
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                console.log(data)
            })
    }, [backServerUrl, id])

    if (userInfo?.email && product?.email && userInfo?.email !== product?.email) {
        return (
            <div className={`h-[80vh] flex items-center justify-center p-6`}>
                <title>Track Order</title>
                <div className="max-w-md w-full  theme-div rounded-2xl shadow-xl p-8 text-center">
                    <div className="mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-red-600 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
                        </svg>
                    </div>


                    <h1 className="text-2xl font-semibold">
                        Not Authorized
                    </h1>
                    <p className="mt-2 text-sm ">
                        You are not authorized to view this order details.
                    </p>


                    <div className="mt-6 flex justify-center gap-3">
                        <Link
                            to={"/"}
                            className="btn theme-btn shadow-none border-0"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-[1440px] mx-auto p-4 rounded-2xl overflow-hidden">
            <title>Track Order - {product.title}</title>
            {/* <h2 className='text-2xl font-bold'></h2> */}

            <div className='max-w-[1440px] mx-auto theme-div text-left p-4 py-20 mt-20 '>

                <div className="mx-auto w-fit">
                    <h1 className='text-left font-semibold text-2xl mb-5'>Track Order - <span className='theme-text'>{product.title}</span></h1>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-10 md:justify-between md:items-start">
                        <div className="mb-6">

                            <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                            <p className="">
                                Price per unit: <span className="font-medium">${product.perPrice}</span>
                            </p>
                            <p className="">
                                Total: <span className="font-medium">${product.total}</span>
                            </p>
                            <p className="">
                                Minimum Order: <span className="font-medium">{product.minimumOrder}</span>
                            </p>
                            <p className=" ">
                                Order posted at: {new Date(product.postedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Customer Details</h3>
                            <p>
                                Name: <span className="font-medium">{product.firstName} {product.lastName}</span>
                            </p>
                            <p>
                                Email: <span className="font-medium">{product.email}</span>
                            </p>
                            <p>
                                Contact: <span className="font-medium">{product.contact}</span>
                            </p>
                            <p>
                                Address: <span className="font-medium">{product.address}</span>
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2 ">Order Status</h3>
                            <p>
                                Status: <span className="font-medium">{product.status}</span>
                            </p>
                            <p>
                                Payment Method: <span className="font-medium">{product.paymentStatus}</span>
                            </p>
                            <p>
                                Current Stage: <span className="font-medium">{product.stage}</span>
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-col justify-center items-center">
                        <ul className="timeline timeline-vertical   lg:timeline-horizontal">

                            <li>
                                <div className="timeline-start flex flex-col">
                                    <p>{product.approvedTime ? new Date(product.approvedTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.approvedTime ? new Date(product.approvedTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5 "
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box  text-center text-black">Preparing </div>
                                <hr className={product.cuttingTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.cuttingTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.cuttingTime ? new Date(product.cuttingTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.cuttingTime ? new Date(product.cuttingTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box text-center text-black">Cutting Completed
                                    {product.cuttingLocation && <p>({product.cuttingLocation})</p>}
                                </div>
                                <hr className={product.sewingTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.sewingTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.sewingTime ? new Date(product.sewingTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.sewingTime ? new Date(product.sewingTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box  text-center text-black">Sewing Started
                                    {product.sewingLocation && <p>({product.sewingLocation})</p>}
                                </div>
                                <hr className={product.finishingTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.finishingTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.finishingTime ? new Date(product.finishingTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.finishingTime ? new Date(product.finishingTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box text-center text-black">Finishing
                                    {product.finishingLocation && <p>({product.finishingLocation})</p>}
                                </div>
                                <hr className={product.qcTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.qcTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.qcTime ? new Date(product.qcTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.qcTime ? new Date(product.qcTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box text-center text-black">QC Checked
                                    {product.qcLocation && <p>({product.qcLocation})</p>}
                                </div>
                                <hr className={product.packedTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.packedTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.packedTime ? new Date(product.packedTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.packedTime ? new Date(product.packedTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box text-center text-black">Packed
                                    {product.packedLocation && <p>({product.packedLocation})</p>}
                                </div>
                                <hr className={product.shippedTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.shippedTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.shippedTime ? new Date(product.shippedTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.shippedTime ? new Date(product.shippedTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box text-center text-black">Shipped
                                    {product.shippedLocation && <p>({product.shippedLocation})</p>}
                                </div>
                                <hr className={product.deliveryTime && "bg-purple-600"} />
                            </li>
                            <li>
                                <hr className={product.deliveryTime && "bg-purple-600"} />
                                <div className="timeline-start flex flex-col">
                                    <p>{product.deliveryTime ? new Date(product.deliveryTime).toLocaleDateString() : "Not Set"}</p>
                                    <p>{product.deliveryTime ? new Date(product.deliveryTime).toLocaleTimeString() : ""}</p>
                                </div>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box text-center text-black">Out for Delivery
                                    {product.deliveryLocation && <p>({product.deliveryLocation})</p>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default MyOrderTrack;