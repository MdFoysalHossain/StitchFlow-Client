import React from 'react';
import { Link } from 'react-router';

const SingleOurProduct = ({ item }) => {
    {
        console.log(item)
    }
    return (


        <div className="card w-96 bg-white backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300">
            <figure className="overflow-hidden h-60 flex justify-center items-center bg-gray-100">
                <img
                    className="bg-white  w-full object-cover transition-transform duration-500 hover:scale-105"
                    src={item.images[0]}
                    alt={item.title}
                />
                <span className="absolute top-5 right-5 inline-block text-sm bg-purple-100 text-purple-700 w-auto px-3 py-1 rounded-full font-semibold">
                    {item.category}
                </span>
            </figure>

            <div className="p-5 flex flex-col gap-3">


                <h2 className="text-xl font-semibold text-gray-900 truncate">{item.title}</h2>

                <div className="flex justify-between items-center text-center">
                    <div className="bg-gray-100 px-5 rounded-md">
                        <span className='label text-sm text-black'>Per Piece: </span>
                        <p className="text-lg font-bold text-gray-900">${item.perPrice}</p>
                    </div>
                    <div className="bg-gray-100 px-5 rounded-md">
                        <span className='label text-sm text-black'>Available: </span>
                        <p className="text-lg font-bold text-gray-900">{item.availableQuanity}</p>
                    </div>
                    <div className="bg-gray-100 px-5 rounded-md">
                        <span className='label text-sm text-black'>Min Order: </span>
                        <p className="text-lg font-bold text-gray-900">{item.minimumOrder}</p>
                    </div>
                </div>

                <Link to={`/SingleProduct/${item._id}`} className="mt-2 w-full btn theme-btn font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    View Details
                </Link>
            </div>
        </div>


    );
};


export default SingleOurProduct;