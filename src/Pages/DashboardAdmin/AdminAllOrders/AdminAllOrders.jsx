import React from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import { use } from 'react';
import { useState } from 'react';
import AdminSingleOrder from './AdminSingleOrder';


const AdminAllOrders = () => {


    const { userInfo, backServerUrl, } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [prodLoad, setProdLoad] = useState(true)
    const [updateEffect, setUpdateEffect] = useState(true)


    useEffect(() => {
        if (updateEffect) {
            fetch(`${backServerUrl}/AdminAllOrders`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${userInfo.accessToken}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(userInfo?.email)
                    setProducts(data)
                    setProdLoad(false)
                    setUpdateEffect(false)
                    console.log("Reloaded")
                })
        }


    }, [backServerUrl, userInfo?.email, updateEffect])

    if (prodLoad) {
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <span className="loading scale-125 loading-spinner text-purple-600"></span>
        </div>
    }

    const handleFilter = (e) => {
        e.preventDefault()
        const filterBy = e.target.value;

        console.log("Filter:", filterBy)

        // setProdLoad(true)
        fetch(`${backServerUrl}/AdminAllOrders?filter=${filterBy}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(userInfo?.email)
                setProducts(data)
                // setProdLoad(false)
                // setUpdateEffect(false)
                // console.log("Reloaded")
            })
    }




    return (
        <div className='mt-5 '>
            <div className=" flex justify-between items-center mb-5">
                <h2 className='text-left  font-semibold text-2xl'>All Orders ({products.length})</h2>
                <title>Admin - All Orders</title>
                <div className=" text-left w-[150px]">
                    <p className='text-sm'>Filter By</p>
                    <select onChange={handleFilter} defaultValue="all" className="select text-black">
                        <option value='all'>All</option>
                        <option value='pending'>Pending</option>
                        <option value='confirmed'>Accepted</option>
                        <option value='rejected'>Rejected</option>
                    </select>
                </div>
            </div>

            <div className="">

                <div className=" overflow-x-auto xl:overflow-x-visible ">
                    <table className="table w-full theme-div-white text-black">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User </th>
                                <th className=' w-min-[200px]'>Product </th>
                                <th>Quantity </th>
                                <th>Order Status</th>
                                <th>Approved Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody className=''>
                            {
                                products.map((item, index) => <AdminSingleOrder key={index} setUpdateEffect={setUpdateEffect} item={item} products={products} setProducts={setProducts} />)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};
export default AdminAllOrders;