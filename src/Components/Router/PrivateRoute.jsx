import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { loading, userInfo } = use(AuthContext)
    const navigate = useNavigate()

    if (loading) {
        return <div className='w-full h-[60vh] flex justify-center items-center'>
            <span className="loading loading-spinner text-purple-600"></span>
        </div>
    }

    if (!userInfo) {
        return <Navigate to={"/Login"}></Navigate>
        // return navigate("/Login")
    }


    return children;
};

export default PrivateRoute;