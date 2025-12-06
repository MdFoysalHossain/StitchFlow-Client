import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const createEmailAccount = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInEmail = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const userSignOut = () => {
        
        return signOut(auth).then(res => {
            setUserInfo(null)
            setLoading(false)
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Unsubscribe:", user)
                setUserInfo(user)
                setLoading(false)
            }else{
                setUserInfo(null)
                setLoading(false)
                console.log("Unsubscribe: No User")
            }
        })

        return unsubscribe
    }, [])
    

    const allValue = {
        loading,
        userInfo,
        createEmailAccount,
        signInEmail,
        userSignOut
    }

    return (
        <AuthContext value={allValue}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;

