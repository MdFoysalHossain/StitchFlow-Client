import React from 'react';
import Banner from './Components/Banner';
import OurProducts from './Components/OurProducts';
import HowItWorks from './Components/HowItWorks';
import ProductionWorkflowPreview from './Components/ProductionWorkflowPreview';
import CustomerFeedbackCarousel from './Components/CustomerFeedbackCarousel';
import SystemStatsPreview from './Components/SystemStatsPreview';

const Home = () => {
    return (
        <div className='h-full'>
            <title>Home - StitchFlow</title>
            <Banner/>
            <OurProducts/>
            <SystemStatsPreview/>
            <HowItWorks/>
            <ProductionWorkflowPreview/>
            <CustomerFeedbackCarousel/>
        </div>
    );
};

export default Home;