import React, { use, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { AuthContext } from '../../Components/Context/AuthContext';
import { Library } from 'lucide-react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const { backServerUrl, dbUserInfo } = use(AuthContext)
    const [productData, setProductData] = useState()

    const sessionId = searchParams.get("session_id")



    useEffect(() => {
        if(sessionId !== null){
            fetch(`${backServerUrl}/payment-success?session_id=${sessionId}`, {
                method: "POST"
            })
                .then(res => res.json())
                .then(data => {
                    setProductData(data)
                })
        }

    }, [backServerUrl])

    return (
        <div className="flex items-center justify-center min-h-[80vh]  px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 text-center">

                <div className="flex justify-center mb-4">
                    <div className="bg-purple-100 text-purple-600 p-4 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-purple-600 mb-2">
                    {sessionId !== null? "Payment" : "Order"} Successful!
                </h2>

                <p className="text-base text-gray-600 mb-6">
                    Your order has been placed and is now being processed.
                    You can check from <b>Dashboard</b> page.
                </p>

                <Link to={"/"} className="btn theme-btn w-full text-white">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;