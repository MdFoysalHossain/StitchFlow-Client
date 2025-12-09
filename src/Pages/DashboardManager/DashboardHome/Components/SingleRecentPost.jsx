import React from 'react';

const SingleRecentPost = ({ item }) => {
    const paymentMode = item.cod && item.onlinePay
        ? "COD & Online Pay"
        : item.cod
            ? "Cash On Delivery"
            : item.onlinePay
                ? "Online Pay"
                : "N/A";

    const onDelete = () => {

    }

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
                <button
                    onClick={() => onDelete(item._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SingleRecentPost;