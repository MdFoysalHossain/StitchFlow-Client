import React from 'react';
import { use } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import SingleOrder from './SingleOrder';

const MyOrders = () => {

    const { userInfo, backServerUrl } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [prodLoad, setProdLoad] = useState(true)

    useEffect(() => {
        fetch(`${backServerUrl}/MyOrders?email=${userInfo?.email}&limit=16`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            }
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
        <div className='mt-5 max-w-[1440px] md:mx-auto mx-4 p-0 md:p-4'>
            <title>My Orders</title>
            <h2 className='text-left mb-5 font-semibold text-2xl'>My Orders ({products.length})</h2>


            <div className="overflow-x-auto xl:overflow-x-visible">

                <table className="table w-full theme-div-white text-black">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products?.map((item, index) => <SingleOrder key={index} item={item} products={products} setProducts={setProducts} />)
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );

};

export default MyOrders;