import React from 'react';
import Banner from './Components/Banner';
import OurProducts from './Components/OurProducts';

const Home = () => {
    return (
        <div className='h-full'>
            <title>Home - StitchFlow</title>
            <Banner/>
            <OurProducts/>
        </div>
    );
};

export default Home;