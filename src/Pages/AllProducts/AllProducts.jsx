import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../Components/Context/AuthContext';
import { useState } from 'react';
import SingleProduct from './SingleProduct';
import DashboardAdminRoot from '../Root/DashboardAdminRoot';

const AllProducts = () => {

    const { backServerUrl } = use(AuthContext)
    const [allPost, setAllPost] = useState()
    const [prodTotal, setProdTotal] = useState(0)
    const [pages, setPages] = useState(0)
    const [currentPages, setCurrentPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const[skip, setSkip] = useState(0)
    const skipBy = 1;
    const limit = 4;

    useEffect(() => {
        fetch(`${backServerUrl}/AllProducts?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched:", data);
                setAllPost(data.products);
                setProdTotal(data.total)
                setLoading(false)

                const totalPages = Math.ceil(data.total / limit);
                setPages(totalPages)
                console.log("Data Total",  data.products)
            })
            .catch(err => console.error(err));

    }, [backServerUrl, skip]);


    const skipNext = () => {
        const skipTo = skip + skipBy
        console.log("Skip:", skip, "\nProdTotal:", prodTotal)
        if(currentPages + 1  >= pages){
            return
        }else{
            setSkip(skipTo)
            setCurrentPages(currentPages + 1)
        }
    }

    const skipPrev = () => {
        const skipTo = skip - skipBy
        console.log("Skip:", skip, "\nProdTotal:", prodTotal)
        if(currentPages === 0){
            return
        }else{
            setSkip(skipTo)
            setCurrentPages(currentPages - 1)
        }
    }


    return (
        <div className='max-w-[1440px] mx-auto text-left'>
            <div className="my-5">
                <h1 className='text-2xl font-semibold'>All Products</h1>
            </div>

            {
                loading ? <div className='w-full h-[50vh] flex justify-center items-center'><span className="loading scale-150 loading-spinner text-purple-600"></span></div> :
                    <div className="grid grid-cols-3 gap-5 justify-items-center items-center w-full">
                        {
                            allPost.map((item, index) => <SingleProduct key={index} item={item} />)
                        }
                    </div>

            }

            <div className="join flex w-fit mx-auto mt-10">
                <button onClick={() => skipPrev()} className="join-item btn  border border-black shadow-none bg-white w-[125px] disabled:text-black">Previous page</button>

                <button disabled className="join-item btn border-x-0 bg-white w-[75px] border border-black text-black">
                    {currentPages + 1} / {pages}
                </button>
                {
                    console.log(skip, prodTotal)
                }
                <button onClick={() => skipNext()} className="join-item btn  bg-white border shadow-none border-black text-black w-[125px]">Next</button>
            </div>


        </div>
    );
};

export default AllProducts;