import React from 'react';
import { AuthContext } from '../../../Components/Context/AuthContext';
import { use } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import SingleOurProduct from './SingleOurProduct';
import { Link } from 'react-router';

const OurProducts = () => {

    const { backServerUrl } = use(AuthContext)
    const [allPost, setAllPost] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${backServerUrl}/AllProducts?limit=6&isHome=true`)
            .then(res => res.json())
            .then(data => {
                // console.log("Fetched:", data);
                setAllPost(data.products);
                setLoading(false)

                // console.log("Products", data.products)
            })
            .catch(err => console.error(err));

    }, [backServerUrl]);

    return ( 
        <div className='max-w-[1440px] mx-auto text-left mt-10 m-4'>
            <div className="my-5 flex justify-between items-center m-4">
                <div className="hidden md:block md:w-25"></div>
                <h1 className='text-3xl md:text-4xl font-bold mb-4  underline underline-offset-10 decoration-purple-600'>Our Products</h1>

                <Link to={`/AllProducts`} className="btn theme-btn shadow-none border-0">
                    View More
                </Link>
            </div>

            {
                loading ? <div className='w-full h-[50vh] flex justify-center items-center'><span className="loading scale-150 loading-spinner text-purple-600"></span></div> :
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center items-center w-full">
                        {
                            allPost.map((item, index) => <SingleOurProduct key={index} item={item} />)
                        }
                    </div>

            }


        </div>
    );
};


export default OurProducts;