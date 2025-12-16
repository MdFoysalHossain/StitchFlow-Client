import React from 'react';
import SingleRecentPost from './SingleRecentPost';

const RecentPosts = ({allProducts}) => {
    return (
        <div className='mt-10'>

            <h2 className='text-2xl font-semibold text-left'>Recent Posted ({allProducts.length >= 8 ? 8 : allProducts.length})</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 justify-start text-left gap-5 mt-2">
                {
                    allProducts.map((item, index) => <SingleRecentPost index={index} key={index} item={item}/>)
                }
            </div>

        </div>
    );
};

export default RecentPosts;