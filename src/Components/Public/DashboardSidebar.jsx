import React, { useState, useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Logo from '/Logo2.png';
import Logo2 from '/Logo3.png';
import { AuthContext } from '../Context/AuthContext';

const DashboardSidebar = () => {
    const [theme, setTheme] = useState("light");
    const [isOpen, setIsOpen] = useState(true); // sidebar toggle for small screens

    const { userInfo, userSignOut } = useContext(AuthContext);

    const links = (
        <>
            <li>
                <NavLink to="/" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/AllProducts" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                    All Products
                </NavLink>
            </li>

            {!userInfo && (
                <>
                    <li>
                        <NavLink className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">About Us</NavLink>
                    </li>
                    <li>
                        <NavLink className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">Contact</NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="btn shadow-none border border-purple-600 bg-purple-600 text-white w-full mt-2"
                            to="/Login"
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="btn shadow-none border border-purple-600 bg-purple-600 text-white w-full mt-2"
                            to="/Register"
                        >
                            Register
                        </NavLink>
                    </li>
                </>
            )}

            {userInfo && (
                <>
                    <li>
                        <NavLink className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/CreatePost"
                            className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center"
                        >
                            Create Post
                        </NavLink>
                    </li>
                    <li>
                        <button
                            className="btn shadow-none border border-purple-600 bg-purple-600 text-white w-full mt-2"
                            onClick={userSignOut}
                        >
                            Log Out
                        </button>
                    </li>
                </>
            )}
        </>
    );

    return (
        // <div className="flex h-screen">
        //     {/* Sidebar */}
        //     <div
        //         className={`theme-div border-r-1 border-dashed shadow-lg w-64 flex flex-col fixed top-0 left-0 h-full transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"
        //             }`}
        //     >
        //         <div className="flex items-center justify-center py-4 border-b border-gray-200 dark:border-gray-700">
        //             <img src={theme === "light" ? Logo : Logo2} alt="Logo" className="w-10 h-10 mr-2" />
        //             <span className="text-xl font-bold theme-text">StitchFlow</span>
        //         </div>

        //         <ul className="flex-1 p-4 space-y-2 text-gray-800 dark:text-gray-100">{links}</ul>

        //         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        //             <ThemeToggle theme={theme} setTheme={setTheme} />
        //         </div>
        //     </div>

        //     {/* Main Content */}
        //     <div className="flex-1 ml-64 theme-div p-4 overflow-auto h-screen">
        //         <Outlet></Outlet>
        //     </div>
        // </div>


        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`
      theme-div border-r border-dashed shadow-lg w-64 flex flex-col fixed top-0 left-0 h-full
      bg-white dark:bg-gray-800 transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-64"}
      md:translate-x-0
    `}
            >
                {/* Logo */}
                <div className="flex items-center justify-center py-4 border-b border-gray-200 dark:border-gray-700">
                    <img src={theme === "light" ? Logo : Logo2} alt="Logo" className="w-10 h-10 mr-2" />
                    <span className="text-xl font-bold theme-text">StitchFlow</span>
                </div>

                {/* Menu Links */}
                <ul className="flex-1 p-4 space-y-2 text-gray-800 dark:text-gray-100">{links}</ul>

                {/* Theme Toggle */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 ml-0 md:ml-64 theme-div p-4 overflow-auto h-screen">
                {/* Mobile toggle button */}
                <button
                    className="lg:hidden mb-4  btn theme-btn fixed top-1 left-1 z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <Outlet />
            </div>
        </div>


    );
};

export default DashboardSidebar;
