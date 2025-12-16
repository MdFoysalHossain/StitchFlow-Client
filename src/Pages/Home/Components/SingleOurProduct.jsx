import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const SingleOurProduct = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} whileHover={{ y: -6 }}
      className="card w-90 bg-white backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300"
    >
      <figure className="relative overflow-hidden h-60 flex justify-center items-center bg-gray-100">
        <motion.img src={item.images[0]} alt={item.title} className="bg-white w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }}/>

        <span className="absolute top-5 right-5 inline-block text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold"> {item.category} </span>
      </figure>

      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-900 truncate"> {item.title} </h2>

        <div className="flex justify-between items-center text-center gap-2">
          <div className="bg-gray-100 px-4 py-2 rounded-md">
            <span className="text-sm text-black">Per Piece</span>
            <p className="text-lg font-bold text-gray-900"> ${item.perPrice} </p>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-md">
            <span className="text-sm text-black">Available</span>
            <p className="text-lg font-bold text-gray-900"> {item.availableQuanity}</p>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-md">
            <span className="text-sm text-black">Min Order</span>
            <p className="text-lg font-bold text-gray-900">{item.minimumOrder}</p>
          </div>
        </div>

        <motion.div whileTap={{ scale: 0.96 }}>
          <Link to={`/SingleProduct/${item._id}`} className="mt-2 w-full btn theme-btn font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};


export default SingleOurProduct;