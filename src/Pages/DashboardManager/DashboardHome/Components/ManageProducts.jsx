import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../../../Components/Context/AuthContext';
import { useState } from 'react';

const ManageProducts = () => {

    const { userInfo, backServerUrl } = use(AuthContext)
    const [products, setProducts] = useState([])
    const [prodLoad, setProdLoad] = useState(true)



    useEffect(() => {
        fetch(`${backServerUrl}/GetProductsStats?email=${userInfo?.email}&limit=8`, {
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
        <div>
            This is the Product
        </div>
    );
};

export default ManageProducts;