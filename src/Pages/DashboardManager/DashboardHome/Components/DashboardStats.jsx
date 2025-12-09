import React, { use, useEffect, useState } from 'react';
import { Package, ClipboardList, BadgeCheck , HandCoins, CreditCard  } from "lucide-react";
import { AuthContext } from '../../../../Components/Context/AuthContext';

const DashboardStats = ({setAllProducts, allProducts}) => {
    const {userInfo, backServerUrl} = use(AuthContext)
    const [products, setProducts] = useState([])
    const [pendingProducts, setPendingProducts] = useState([])
    const [confirmedProducts, setConfirmedProducts] = useState([])



    const [prodLoad, setProdLoad] = useState(true)
    const [pendLoad, setPendLoad] = useState(true)


    const allLoaded = prodLoad || pendLoad


    useEffect(() => {
        fetch(`${backServerUrl}/GetProductsStats?email=${userInfo?.email}&limit=8`, {
            method: "GET"
        }) .then (res => res.json()) .then(data => {
            setAllProducts(data)
            setProducts(data)
            console.log("userInfo?.email:", userInfo?.email)
            // console.log("Got Data:", data.length)
        })

        fetch(`${backServerUrl}/GetPendingStats?email=${userInfo?.email}&limit=8`, {
            method: "GET"
        }) .then (res => res.json()) .then(data => {
            setPendingProducts(data)
        })


        fetch(`${backServerUrl}/GetApprovedStats?email=${userInfo?.email}&limit=8`, {
            method: "GET"
        }) .then (res => res.json()) .then(data => {
            setConfirmedProducts(data)
        })

        fetch(`${backServerUrl}/GetApprovedStats?email=${userInfo?.email}&limit=8`, {
            method: "GET"
        }) .then (res => res.json()) .then(data => {
            setConfirmedProducts(data)
        })
    }, [backServerUrl, userInfo?.email])

    if(!allLoaded){
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <span className="loading scale-125 loading-spinner text-purple-600"></span>
        </div>
    }


    return (
        <div className='max-w-[1440px] mx-auto'>
            <h2 className='text-left font-semibold text-2xl mb-4'>Product Status</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 *:hover:scale-101">

                <div className="p-6 rounded-2xl theme-dashboard-card backdrop-blur-xl shadow-lg 
                transition-all border border-white/20 flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-purple-900/60 dark:bg-purple-900/40">
                        <Package className="w-8 h-8 text-purple-100 dark:text-purple-300" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-left">Total Products</p>
                        <p className="text-3xl font-bold mt-1 text-left">{products.length}</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl theme-dashboard-card backdrop-blur-xl shadow-lg 
                transition-all border border-white/20 flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/40">
                        <ClipboardList className="w-8 h-8 text-yellow-600 dark:text-yellow-300" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-left">Pending Orders</p>
                        <p className="text-3xl font-bold mt-1 text-left">{pendingProducts.length}</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl theme-dashboard-card backdrop-blur-xl shadow-lg 
                transition-all border border-white/20 flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/40">
                        <BadgeCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-left">Approved Orders</p>
                        <p className="text-3xl font-bold mt-1 text-left">{confirmedProducts.length}</p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default DashboardStats;