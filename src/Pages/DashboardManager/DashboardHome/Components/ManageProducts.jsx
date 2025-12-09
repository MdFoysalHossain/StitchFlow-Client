import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../../../Components/Context/AuthContext';
import { useState } from 'react';
import SingleManageProduct from './SingleManageProduct';

const ManageProducts = () => {

    const { userInfo, backServerUrl } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [prodLoad, setProdLoad] = useState(true)



    useEffect(() => {
        fetch(`${backServerUrl}/GetProductsStats?email=${userInfo?.email}&limit=16`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setProducts(data)
            setProdLoad(false)
            console.log("userInfo?.email:", userInfo?.email)
            console.log("Product Data:", data)
        })
    }, [backServerUrl, userInfo?.email])

    if (prodLoad) {
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <span className="loading scale-125 loading-spinner text-purple-600"></span>
        </div>
    }

    return (
        <div className='mt-5'>

            <h2 className='text-left mb-5 font-semibold text-2xl'>All Products ({products.length})</h2>

            <table className="table w-full theme-div-white text-black">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price Per Product</th>
                        <th>Minimum Order</th>
                        <th>Available Qualtity</th>
                        <th>Payment Mode</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                        {
                            products.map((item, index) => <SingleManageProduct key={index} item={item} />)
                        }
                </tbody>

            </table>
        </div>
    );
};

export default ManageProducts;