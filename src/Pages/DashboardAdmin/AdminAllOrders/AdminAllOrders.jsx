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
                method: "GET"
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
            method: "GET"
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
        <div className='mt-5'>

            <div className=" flex justify-between items-center mb-5">
                <h2 className='text-left mb-5 font-semibold text-2xl'>All Orders ({products.length})</h2>

                <div className=" text-left w-[200px]">
                    <p className='text-sm'>Filter By</p>
                    <select onChange={handleFilter} defaultValue="all" className="select">
                        <option value='all'>All</option>
                        <option value='pending'>Pending</option>
                        <option value='accepted'>Accepted</option>
                        <option value='rejected'>Rejected</option>
                    </select>
                </div>
            </div>

            <table className="table w-full theme-div-white text-black">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User </th>
                        <th>Product </th>
                        <th>Quantity </th>
                        <th>Approved Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map((item, index) => <AdminSingleOrder key={index} setUpdateEffect={setUpdateEffect} item={item} products={products} setProducts={setProducts} />)
                    }
                </tbody>

            </table>
        </div>
    );
};
export default AdminAllOrders;