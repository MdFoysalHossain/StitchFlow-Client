import React, { use } from 'react';
import SideImage from "/Login.avif"
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Components/Context/AuthContext';

const Login = () => {
    const { backServerUrl, googleLogin, signInEmail, userInfo } = use(AuthContext)
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log("Google Res:", res.user)
                const userData = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL,
                    accountType: "buyer",
                }

                fetch(`${backServerUrl}/createUser`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data2 => {
                        console.log("Successfully Updated to DB:", data2)
                        navigate("/")
                    })
                    .catch(err => console.log("Server Store Error:", err))
            })
    }

    const handleEmailLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInEmail(email, password)
            .then(res => {
                console.log("User Logged In:", res)
                navigate("/")
            })
            .catch(err => console.log("Login Error:", err))
    }

    if(userInfo){
        navigate("/")
    }

    return (
        <div className="flex mt-10 items-center">
            <title>User Login</title>
            <div className='mx-auto w-fit p-4 md:p-0 max-w-[700px] bg-white shadow-xl flex justify-center items-center rounded-xl overflow-hidden'>
                <div className="flex">
                    <div className="flex-1 hidden md:block h-[600px] overflow-hidden relative">
                        <img
                            src={SideImage}
                            alt=""
                            className="h-full w-auto object-cover"
                        />
                        <h1 className='text-4xl absolute bottom-4 left-5 theme-text-white'>Login To Account</h1>
                    </div>



                    <div className="flex-1 w-full flex items-center">
                        <div className="card w-full max-w-sm shrink-0 ">
                            <h2 className='text-2xl font-bold theme-text-black'>Welcome Back!</h2>
                            <div className="card-body">
                                <form onSubmit={handleEmailLogin}>
                                    <fieldset className="fieldset gap-2">
                                        <label className="label">Email</label>
                                        <input name='email' type="email" className="input theme-text-black" placeholder="Email" required/>
                                        <label className="label">Password</label>
                                        <input name='password' type="password" className="input theme-text-black" placeholder="Password" required/>
                                        <button className="btn theme-btn mt-0">Login</button>
                                    </fieldset>
                                </form>
                                    <div><Link className="link link-hover theme-text text-md" to={"/Register"}>Create An New Account?</Link></div>
                            </div>

                            <div className="">
                                <div className="mb-2 text-lg theme-text-black">
                                    or
                                </div>
                                <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mt-2">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;