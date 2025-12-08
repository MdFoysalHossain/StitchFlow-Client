import React from 'react';
import DashboardSidebar from '../../Components/Public/DashboardSidebar';
import { Outlet } from 'react-router';

const DashboardManagerRoot = () => {
    return (
        <div className='relative'>
            <DashboardSidebar/>
            {/* <Outlet/> */}
        </div>
    );
};

export default DashboardManagerRoot;