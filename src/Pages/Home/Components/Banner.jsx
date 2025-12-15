import React from 'react';
import BG from '/BG.png';
import {Link} from "react-router"

const Banner = () => {
    return (
        <div
            className="banner"
            style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '90vh',
                width: '100%',
            }}
        >
            <div className="bg-black/50 h-full w-full">
                <div className="max-w-[1440px] mx-auto flex items-center h-full">
                    <div className="text-left">
                        <h1 className='text-purple-600 text-6xl font-bold mb-2'>StitchFlow</h1>
                        <p className='text-2xl mb-4 w-[500px] text-white'>Track garment orders, manage every production stage, and deliver on time. All from one powerful platform built to support modern garment factories and growing businesses.</p>
                        <div className="">
                            <Link to={"/AllProducts"} className='btn theme-btn border-0 shadow-none'>View All Product</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
