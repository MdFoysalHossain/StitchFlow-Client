import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null)

    const createEmailAccount = () => {
        return ""
    }
    

    const allValue = {
        userInfo
    }

    return (
        <AuthContext value={allValue}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;

