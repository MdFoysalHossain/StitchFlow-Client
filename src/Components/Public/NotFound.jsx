import React from 'react';
import { Link } from "react-router";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center theme-div px-4">
            <div className="text-center max-w-md">
                {/* 404 Text */}
                <h1 className="text-8xl font-extrabold tracking-widest">
                    404
                </h1>

                {/* Divider */}
                <div className="w-24 h-1 theme-btn mx-auto my-6 rounded-full" />

                {/* Message */}
                <h2 className="text-2xl font-semibold  mb-3">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mb-8">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>

                {/* Action */}
                <Link
                    to="/"
                    className="inline-block px-6 py-3 text-sm font-medium text-white theme-btn rounded-xl shadow-lg"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}


export default NotFound;