import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';

const ManagerRoute = ({ children }) => {
    const { loading, dbUserInfo, userInfo } = use(AuthContext);

    if (loading) {
        return (
            <div>
                <span className="loading loading-spinner text-purple-600"></span>
            </div>
        );
    }

    if (!userInfo || !dbUserInfo) {
        return <Navigate to="/Login" replace />;
    }

    if (dbUserInfo.accountType !== "Manager" && dbUserInfo.accountType !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ManagerRoute;
