import React, { useState } from 'react';
import DashboardStats from './Components/DashboardStats';
import RecentPosts from './Components/RecentPosts';

const DashboardHome = () => {
    const [allProducts, setAllProducts] = useState([])

    return (
        <div className='max-w-[1440px] mx-auto'>
            <title>Manager Dashboard</title>
            <DashboardStats setAllProducts={setAllProducts}/>

            <RecentPosts allProducts={allProducts}/>
        </div>
    );
};

export default DashboardHome;