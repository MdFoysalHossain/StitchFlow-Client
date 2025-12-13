import React from 'react';
import { Link } from 'react-router';

const SingleRecentPost = ({ item }) => {
    const paymentMode = item.cod && item.onlinePay
        ? "COD & Online Pay"
        : item.cod
            ? "Cash On Delivery"
            : item.onlinePay
                ? "Online Pay"
                : "N/A";


    return (
        <div className="w-full flex items-center justify-between p-4 theme-dashboard-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">

            {/* Image */}
            <div className="flex flex-row  items-center gap-4">
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="">
                    <p className="font-semibold text-lg">{item.title}</p>
                    <div className="flex gap-5">
                        <p className="text-sm">Price: $<b>{item.perPrice}</b></p>
                        <p className="text-sm">Payment: {paymentMode}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Link
                    to={`/Dashboard/Manager/UpdateProduct/${item._id}`}
                    className="btn btn-sm btn-success black-text transition"
                >
                    Update
                </Link>
                <Link
                    to={`/SingleProduct/${item._id}`}
                    className="btn btn-sm theme-btn py-4 px-5 transition"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default SingleRecentPost;