import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Logo from '/Logo2.png';
import Logo2 from '/Logo3.png';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {

    const { theme, setTheme } = use(AuthContext)
    // const [theme, setTheme] = useState("light");

    const { userInfo, userSignOut, dbUserInfo } = use(AuthContext);

    //console.log(userInfo ? `Logged in as ${userInfo}` : "Not logged in")
    const allLinks = (
        <ul className="
    flex
    flex-col
    lg:flex-row
    gap-4
    lg:gap-4
    justify-start
    items-center
    text-left
    w-full
    px-4
    *:whitespace-nowrap
    *:focus:bg-transparent
  ">
            <li className='w-fit'>
                <NavLink className="navLink text-right" to="/">Home</NavLink>
            </li>

            <li>
                <NavLink className="navLink" to="/About">About Us</NavLink>
            </li>
            
            <li>
                <NavLink className="navLink" to="/AllProducts">All Product</NavLink>
            </li>

            {!userInfo && (
                <>

                    <li className="w-full lg:w-auto">
                        <NavLink
                            className="btn w-full lg:w-auto shadow-none border border-purple-600 bg-purple-600 text-white theme-btn"
                            to="/Login"
                        >
                            Login
                        </NavLink>
                    </li>

                    <li className="w-full lg:w-auto">
                        <NavLink
                            className="btn w-full lg:w-auto shadow-none border border-purple-600 bg-purple-600 text-white theme-btn"
                            to="/Register"
                        >
                            Register
                        </NavLink>
                    </li>
                </>
            )}

            {userInfo && (
                <>
                    {dbUserInfo?.accountType === "Manager" && (
                        <li>
                            <NavLink className="navLink" to="/Dashboard/Manager">Dashboard</NavLink>
                        </li>
                    )}

                    {dbUserInfo?.accountType === "Admin" && (
                        <li>
                            <NavLink className="navLink" to="/Dashboard/Admin">Dashboard</NavLink>
                        </li>
                    )}

                    {dbUserInfo?.accountType === "Buyer" && (
                        <>
                            <li>
                                <NavLink className="navLink" to="/MyOrders">My Orders</NavLink>
                            </li>

                            <li>
                                <NavLink className="navLink" to="/MyProfile">My Profile</NavLink>
                            </li>
                        </>
                    )}

                    <li className="w-full lg:w-auto">
                        <button
                            onClick={userSignOut}
                            className="btn w-full lg:w-auto shadow-none border border-purple-600 bg-purple-600 text-white theme-btn"
                        >
                            Log Out
                        </button>
                    </li>
                </>
            )}

            <li className='hidden lg:block'>
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </li>
        </ul>
    );


    return (
        <div className="navbar max-w-[1440px]  mx-auto">
            <div className="flex navbar-start w-full justify-between items-center">
                <div className="flex items-center">
                    <div className="flex justify-around">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2  shadow gap-2">
                                {allLinks}
                            </ul>

                        </div>
                        <Link to={"/"} className="btn bg-transparent -ml-5  shadow-none border-0 text-xl flex justify-center items-center title">
                            <img src={theme === "light" ? Logo : Logo2} alt="" className='w-8 h-8 -mr-1' />
                            <p>StitchFlow</p>
                        </Link>
                    </div>
                    {/* <div className="flex-1">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                    </div> */}
                </div>

                {/* MOBILE */}
                <div className="flex-1 w-full flex justify-end mr-5 lg:hidden">
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>

            </div>
            <div className="navbar-end hidden lg:flex justify-start ">
                {/* <ul className="menu w-full menu-horizontal px-1 text-[16px] gap-2 justify-end items-center text-black font-semibold">
                    {allLinks}
                </ul> */}
                {allLinks}
            </div>
        </div>
    );
};





export default Navbar;