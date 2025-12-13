import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
    const { loading, dbUserInfo, userInfo, loadingDbInfo } = use(AuthContext);
    const navigation = useNavigate()

    if (loading || loadingDbInfo) {
        return (
            <div>
                <span className="loading loading-spinner text-purple-600"></span>
            </div>
        );
    }

    if (!userInfo || !dbUserInfo) {
        return <Navigate to={"/Login"}></Navigate>
    }

    if (dbUserInfo.accountType !== "Admin") {
        return <Navigate to={"/"}></Navigate>
    }

    return children;
};


export default AdminRoute;