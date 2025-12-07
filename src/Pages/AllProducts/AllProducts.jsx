import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import { useState } from 'react';
import SingleProduct from './SingleProduct';

const AllProducts = () => {

    const { backServerUrl } = use(AuthContext)
    const [allPost, setAllPost] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${backServerUrl}/AllProducts`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched:", data);
                setAllPost(data);
                setLoading(false)
            })
            .catch(err => console.error(err));

    }, [backServerUrl]);


    return (
        <div className='max-w-[1440px] mx-auto text-left'>
            <div className="my-5">
                <h1 className='text-2xl font-semibold'>All Products</h1>
            </div>

            {
                loading ? <div className='w-full h-[50vh] flex justify-center items-center'><span className="loading scale-150 loading-spinner text-purple-600"></span></div> :
                    <div className="grid grid-cols-3 gap-5 justify-items-center items-center w-full">
                        {
                            allPost?.map((item, index) => <SingleProduct key={index} item={item} />)
                        }
                    </div>

            }


        </div>
    );
};

export default AllProducts;