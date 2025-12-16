import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import { use } from 'react';
import SinglePending from './SinglePending';

const PendingApprove = () => {

    const { userInfo, backServerUrl } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [prodLoad, setProdLoad] = useState(true)



    useEffect(() => {

        fetch(`${backServerUrl}/GetPendingStats?email=${userInfo?.email}&limit=8`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setProducts(data)
                setProdLoad(false)
            })


    }, [backServerUrl, userInfo?.email])

    if (prodLoad) {
        return <div className='w-full h-[100vh] flex justify-center items-center'>
            <span className="loading scale-125 loading-spinner text-purple-600"></span>
        </div>
    }


    return (
        <div className='mt-5'>

            <h2 className='text-left mb-5 font-semibold text-2xl'>Pending Orders ({products.length})</h2>

            <div className="overflow-x-auto xl:overflow-x-visible">
                <table className="table w-full theme-div-white text-black">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User </th>
                            <th>Product </th>
                            <th>Quantity </th>
                            <th>Order Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.map((item, index) => <SinglePending key={index} item={item} products={products} setProducts={setProducts} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingApprove;