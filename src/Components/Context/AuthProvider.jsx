import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [userInfo, setUserInfo] = useState(null)
    const [dbUserInfo, setDbUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingDbInfo, setLoadingDbInfo] = useState(true)
    const [theme, setTheme] = useState("light");
    const backServerUrl = "http://localhost:3000";

    const createEmailAccount = (email, password) => {
        setLoading(false)
        setLoadingDbInfo(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInEmail = (email, password) => {
        setLoading(false)
        setLoadingDbInfo(false)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const userSignOut = () => {
        
        return signOut(auth).then(res => {
            setUserInfo(null)
            setLoading(false)
            setLoadingDbInfo(false)
        })
    }

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Unsubscribe:", user)
                setUserInfo(user)
                setLoading(false)
                
                // console.log("==============",user.accessToken)
                fetch(`${backServerUrl}/FindUser?email=${user.email}`, {
                    method: "GET",
                })
                .then(res => res.json())
                .then(data => {
                    console.log("DB User Data Loaded:", data)
                    setDbUserInfo(data)
                    setLoadingDbInfo(false)
                })
                

            }else{
                setUserInfo(null)
                setLoading(false)
                setLoadingDbInfo(false)
                setDbUserInfo(null)
                console.log("Unsubscribe: No User")
            }
        })

        return unsubscribe
    }, [])
    

    const allValue = {
        loading,
        loadingDbInfo,
        userInfo,
        dbUserInfo,
        createEmailAccount,
        signInEmail,
        userSignOut,
        googleLogin,
        backServerUrl,
        theme,
        setTheme
    }

    return (
        <AuthContext value={allValue}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;

