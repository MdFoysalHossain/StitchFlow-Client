import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Components/Context/AuthContext';
import SingleManageProduct from './SingleManageProduct';

const ManageProducts = () => {

    const { userInfo, backServerUrl } = use(AuthContext);

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [prodLoad, setProdLoad] = useState(true);
    const [selectedCat, setSelectedCat] = useState("all");

    useEffect(() => {
        if (!userInfo?.email) return;

        fetch(`${backServerUrl}/GetProductsStats?email=${userInfo.email}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userInfo.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data || []);    
                setProdLoad(false);
                console.log((data))
            })
            .catch(() => setProdLoad(false));
    }, [backServerUrl, userInfo?.email]);

    // Handle category change
    const handleCatChange = (e) => {
        const cat = e.target.value;
        setSelectedCat(cat);

        if (cat === "all") {
            setFilteredProducts([]);
        } else {
            const result = products.filter(item => item.category === cat);
            setFilteredProducts(result);
        }
    };

    // Decide which products to show
    const displayProducts =
        selectedCat === "all" ? products : filteredProducts;

    if (prodLoad) {
        return (
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <span className="loading scale-125 loading-spinner text-purple-600"></span>
            </div>
        );
    }

    return (
        <div className='mt-5'>

            <div className="flex justify-between items-end mb-5">

                <h2 className='font-semibold text-2xl'>
                    All Products ({displayProducts.length})
                </h2>

                <div className="w-[150px]">
                    <p className='text-sm mb-1'>Select Category</p>
                    <select onChange={handleCatChange} className="select theme-text-black w-full" defaultValue="all">
                        <option value="all">Show All</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Hoodie">Hoodie</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Formal Shirt">Formal Shirt</option>
                        <option value="Sweater">Sweater</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto xl:overflow-x-visible">

                <table className="table w-full theme-div-white text-black">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price Per Product</th>
                            <th>Minimum Order</th>
                            <th>Available Quantity</th>
                            <th>Payment Mode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            displayProducts.length > 0 ? (
                                displayProducts.map((item) => (
                                    <SingleManageProduct key={item._id} item={item} products={products} setProducts={setProducts} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        No products found for this category
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ManageProducts;
