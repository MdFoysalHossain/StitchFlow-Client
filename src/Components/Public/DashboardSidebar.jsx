import React, { useState, useContext, use } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Logo from '/Logo2.png';
import Logo2 from '/Logo3.png';
import { AuthContext } from '../Context/AuthContext';
import "./DashboardSidebar.css"

const DashboardSidebar = () => {
    const { theme, setTheme } = use(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const { userInfo, userSignOut, dbUserInfo } = useContext(AuthContext);

    const links = (
        <>
            <li>
                <NavLink to="/" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                    Home
                </NavLink>
            </li>
            {userInfo && dbUserInfo?.accountType === "Manager" && (
                <>

                    <li>
                        <NavLink className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center" to={"/Dashboard/Manager"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/CreatePost"
                            className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center"
                        >
                            Add Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/Manager/ManagePoducts" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                            Manage Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/Manager/PendingApprove" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                            Pending Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/Manager/ApprovedOrder" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                            Approve Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/MyProfile" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                            My Profile
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

            
            {userInfo && dbUserInfo?.accountType === "Admin" && (
                <>

                    <li>
                        <NavLink className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center" to={"/Dashboard/Admin"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Dashboard/Admin/AllUsers"
                            className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center"
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/Admin/AllProducts" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                            All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/Admin/AllOrders" className="rounded-lg hover:bg-purple-100 px-3 py-2 flex items-center">
                            All Orders
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
        <div className="flex h-screen">

            {/* PC SCREEN */}

            <div
                className={`
                    flex
                    theme-body-dashboard lg:border-r lg:border-dashed shadow-lg w-64 flex-col fixed top-0 left-0 h-full
                    transition-transform duration-300 z-50
                    ${isOpen ? "translate-x-0" : "-translate-x-64"}
                    lg:translate-x-0
                `}
            >
                <div className="flex items-center justify-center py-4 border-b dark:border-gray-700 theme-div">
                    <img src={theme === "light" ? Logo : Logo2} alt="Logo" className="w-10 h-10 mr-2" />
                    <span className="text-xl font-bold theme-text">StitchFlow</span>
                    <button
                        className="lg:hidden p-0 h-8 w-10 ml-2 btn theme-btn"
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
                </div>

                <ul className="flex-1 p-4 space-y-2 text-gray-800 dark:text-gray-100 theme-div DasbhoardLinks">{links}</ul>

                <div className="p-4 border-t theme-div border-gray-200 dark:border-gray-700">
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </div>




            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div className="flex-1 theme-div  ml-0 lg:ml-64  p-4 overflow-auto h-screen">

                {/* MOBILE SCREEN */}
                <div className="border-b dark:border-gray-700   fixed lg:hidden -m-[5px] top-0 py-3 px-2 pt-4 left-1 z-1 w-full theme-div flex justify-left items-center">


                    <button
                        className="lg:hidden p-0 h-8 w-10 btn theme-btn mt-[-5px] mr-5"
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

                    <img src={theme === "light" ? Logo : Logo2} alt="Logo" className="w-10 h-10 mr-2" />
                    <span className="text-xl font-bold theme-text">StitchFlow</span>
                </div>


                <div className="mt-15 lg:mt-0">

                    <Outlet />
                </div>
            </div>
        </div>


    );
};

export default DashboardSidebar;
