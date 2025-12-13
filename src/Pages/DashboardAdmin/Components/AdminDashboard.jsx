import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import AdminRecentPost from './AdminRecentPost';

const AdminDashboard = ({ prodLoading, orderLoading, usersLoading, allProducts }) => {


    if (prodLoading || orderLoading || usersLoading) {
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <span className="loading scale-125 loading-spinner text-purple-600"></span>
        </div>
    }

    return (
        <div className='text-2xl text-left font-semibold mt-10'>
            <h2>Recent Post ({allProducts.length})</h2>
            {
                allProducts.map((item, index) => <AdminRecentPost key={index} item={item} />)
            }
        </div>
    );
};

export default AdminDashboard;