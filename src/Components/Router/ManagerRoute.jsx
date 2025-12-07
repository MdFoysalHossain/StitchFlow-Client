import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const ManagerRoute = ({ children }) => {
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
        return navigation("/Login")
    }

    if (dbUserInfo.accountType !== "Manager" && dbUserInfo.accountType !== "Admin") {
        return navigation("/");
    }

    return children;
};

export default ManagerRoute;
