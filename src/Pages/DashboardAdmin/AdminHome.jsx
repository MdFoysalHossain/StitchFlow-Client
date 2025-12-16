import React, { use, useEffect, useState } from 'react';
import AdminDashboardStats from './Components/AdminDashboardStats';
import AdminRecentPost from './Components/AdminRecentPost';
import { AuthContext } from '../../Components/Context/AuthContext';

const AdminHome = () => {

    const { userInfo, backServerUrl } = use(AuthContext)
    const [allProducts, setAllProducts] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [prodLoading, setProdLoading] = useState(true)
    const [orderLoading, setOrderLoading] = useState(true)
    const [usersLoading, setUsersLoading] = useState(true)

    useEffect(() => {
        fetch(`${backServerUrl}/AdminAllProducts`, { 
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
         })
            .then(res => res.json())
            .then(data => {
                setAllProducts(data)
                setProdLoading(false)
            })

        fetch(`${backServerUrl}/AdminAllOrders`, { 
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
         })
            .then(res => res.json())
            .then(data => {
                setAllOrders(data)
                setOrderLoading(false)
            })

        fetch(`${backServerUrl}/AdminAllUsers`, { 
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
         })
            .then(res => res.json())
            .then(data => {
                setAllUsers(data)
                setUsersLoading(false)
            })
    }, [])
    return (
        <div className='mx-auto max-w-[1440px]'>
            <title>Admin Dashboard</title>
            <AdminDashboardStats usersLoading={usersLoading} orderLoading={orderLoading} prodLoading={prodLoading} allUsers={allUsers} allOrders={allOrders} allProducts={allProducts} />
            <AdminRecentPost allProducts={allProducts} setAllProducts={setAllProducts}/>
        </div>
    );
};

export default AdminHome;