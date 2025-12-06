import React from 'react';
import SideImage from "/Login.avif"
import { Link } from 'react-router';
import { AuthContext } from '../../../Components/Context/AuthContext';

const Login = () => {

    return (
        <div className="h-[80vh] flex items-center">
            <div className='mx-auto w-fit max-w-[700px] bg-white shadow-xl flex justify-center items-center rounded-xl overflow-hidden'>
                <div className="flex">
                    <div className="flex-1 h-[600px] overflow-hidden relative">
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
                                <fieldset className="fieldset gap-2">
                                    <label className="label">Email</label>
                                    <input type="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" className="input" placeholder="Password" />
                                    <button className="btn theme-btn mt-0">Login</button>
                                </fieldset>
                                <div><Link className="link link-hover theme-text text-md" to={"/Register"}>Create An New Account?</Link></div>
                            </div>

                            <div className="">
                                <div className="mb-2 text-lg theme-text-black">
                                    or
                                </div>
                                <button className="btn bg-white text-black border-[#e5e5e5] mt-2">
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