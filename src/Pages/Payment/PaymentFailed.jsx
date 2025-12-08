import React from 'react';
import { Link } from 'react-router';

const PaymentFailed = () => {
    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 text-center text-white">

                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 text-red-600 p-4 rounded-full">
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-red-600 mb-2">
                    Payment Canceled
                </h2>

                <p className="text-base text-gray-600 mb-6">
                    Your payment was not completed.
                    You can try again from the <b>Checkout</b> page.
                </p>

                <Link to={"/"} className="btn bg-red-500 w-full theme-text-white">
                    Go To Home
                </Link>
            </div>
        </div>

    );
};

export default PaymentFailed;