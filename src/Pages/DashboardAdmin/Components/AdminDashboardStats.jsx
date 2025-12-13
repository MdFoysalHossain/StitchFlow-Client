import React from 'react';
import { Package, ClipboardList, BadgeCheck , HandCoins, CreditCard, User  } from "lucide-react";


const AdminDashboardStats = ({allProducts, allOrders, allUsers}) => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <h2 className='text-left font-semibold text-2xl mb-4'>Status</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 *:hover:scale-101">

                <div className="p-6 rounded-2xl theme-dashboard-card backdrop-blur-xl shadow-lg 
                transition-all border border-white/20 flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-purple-900/60 dark:bg-purple-900/40">
                        <Package className="w-8 h-8 text-purple-100 dark:text-purple-300" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-left">Total Products</p>
                        <p className="text-3xl font-bold mt-1 text-left">{allProducts.length}</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl theme-dashboard-card backdrop-blur-xl shadow-lg 
                transition-all border border-white/20 flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/40">
                        <ClipboardList className="w-8 h-8 text-yellow-600 dark:text-yellow-300" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-left">Total Orders</p>
                        <p className="text-3xl font-bold mt-1 text-left">{allOrders.length}</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl theme-dashboard-card backdrop-blur-xl shadow-lg 
                transition-all border border-white/20 flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/40">
                        <User className="w-8 h-8 text-green-600 dark:text-green-300" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-left">Total Users</p>
                        <p className="text-3xl font-bold mt-1 text-left">{allUsers.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardStats;