import React, { use, useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Logo from '/Logo2.png';
import Logo2 from '/Logo3.png';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {

    const [theme, setTheme] = useState("light");

    const { userInfo, userSignOut } = use(AuthContext);

    console.log(userInfo ? `Logged in as ${userInfo}` : "Not logged in")

    const allLiks = <>

        <li><NavLink>Home</NavLink></li>
        <li><NavLink>All Product</NavLink></li>
        {
            !userInfo && <>
                <li><NavLink>About Us</NavLink></li>
                <li><NavLink>Contact</NavLink></li>
                <li><NavLink className="btn shadow-none border border-purple-600 bg-purple-600 text-white theme-btn" to={"/Login"}>Login</NavLink></li>
                <li><NavLink className="btn shadow-none border border-purple-600 bg-purple-600 text-white theme-btn"  to={"/Register"}>Register</NavLink></li>
            </>
        }

        {
            userInfo && <>
                <li><NavLink>Dashboard</NavLink></li>
                <li><Link className="btn shadow-none border border-purple-600 bg-purple-600 text-white theme-btn" onClick={userSignOut}>Log Out</Link></li>
            </>
        }


    </>

    return (
        <div className="navbar max-w-[1440px] mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                        {allLiks}
                    </ul>
                </div>
                <a className="btn bg-transparent shadow-none border-0 text-xl flex items-center title">
                    <img src={theme === "light" ? Logo : Logo2} alt="" className='w-8 h-8 -mr-1' />
                    <p>StitchFlow</p>
                </a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-[16px] gap-2 justify-end items-center font-semibold">
                    {allLiks}
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </ul>
            </div>
            {/* <div className="navbar-end">
                <a className="btn">Button</a>
            </div> */}
        </div>
    );
};

export default Navbar;