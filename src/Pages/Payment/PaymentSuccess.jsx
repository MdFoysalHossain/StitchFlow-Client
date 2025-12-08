import React from 'react';
import { useParams } from 'react-router';

const PaymentSuccess = () => {
    const {id} = useParams()
    return (
        <div>
            This is Payment Success {id}
        </div>
    );
};

export default PaymentSuccess;