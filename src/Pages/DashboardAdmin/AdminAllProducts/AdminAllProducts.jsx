import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import AdminSingleProduct from './AdminSingleProduct';

const AdminAllProducts = () => {
    const { userInfo, backServerUrl } = use(AuthContext)
    const [allProducts, setAllProducts] = useState([])
    const [prodLoading, setProdLoading] = useState(true)

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
    }, [])

    return (
        <div className='text-2xl text-left font-semibold mt-10'>
            <h2>All Products ({allProducts.length})</h2>


            <div className="bg-white rounded-xl mt-5 overflow-x-auto xl:overflow-x-visible">

                <table className="table w-full  text-black">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price Per Product</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {
                            allProducts.map((item, index) => <AdminSingleProduct key={index} index={index} item={item} setAllProducts={setAllProducts} allProducts={allProducts} />)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminAllProducts;