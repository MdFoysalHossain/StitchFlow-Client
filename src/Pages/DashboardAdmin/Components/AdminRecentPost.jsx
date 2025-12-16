import React from 'react';
import AdminSingleRecentPost from './AdminSingleRecentPost';

const AdminRecentPost = ({ allProducts, setAllProducts }) => {
    return (
        <div className='text-2xl text-left font-semibold mt-10'>
            <h2>Recent Post ({allProducts.length >=8 ? 8 : allProducts.length})</h2>


            <div className="bg-white rounded-xl mt-5 overflow-x-auto xl:overflow-x-visible">

                <table className="table w-full  text-black">
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

                    <tbody className=''>
                        {
                            allProducts.map((item, index) => <AdminSingleRecentPost key={index} index={index} item={item} setAllProducts={setAllProducts} allProducts={allProducts} />)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminRecentPost;