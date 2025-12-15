import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Public/Navbar';
import Footer from '../../Components/Public/Footer';

const Root = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;