import { Facebook, Linkedin, Github, X } from "lucide-react";
import Logo from "/Logo2.png"
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { use } from "react";

export default function Footer() {
    const { backServerUrl, dbUserInfo } = use(AuthContext)

    return (
        <footer className="bg-black text-gray-300 mt-20 *:text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand Info */}
                    <div>
                        <h2 className="text-2xl font-bold  mb-4">
                            <Link className="flex text-xl justify-center items-center">
                                <img src={Logo} className="w-8" alt="" />
                                <span>StitchFlow</span>
                            </Link>
                        </h2>
                        <p className="text-sm leading-relaxed">
                            Track garment orders, manage every production stage, and deliver on time. All from one powerful platform built to support modern garment factories and growing businesses.


                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold *:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="transition"><Link to={"/"} className="white-text">Home</Link></li>
                            <li className="transition"><Link to={"/AllProducts"} className="white-text">All Products</Link></li>
                            {
                                dbUserInfo?.accountType === "Buyer" && <li className="transition"><Link to={"/MyOrders"} className="white-text">My Orders</Link></li>
                            }
                            {
                                dbUserInfo?.accountType === "Manager" && <li className="transition"><Link to={"/Dashboard/Manager"} className="white-text">Dashboard</Link></li>
                            }
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold  mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="transition">How It Works</li>
                            <li className="transition">Track Order</li>
                            <li className="transition">FAQs</li>
                            <li className="transition">Contact Support</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-center mb-4">Connect</h3>
                        <div className="flex gap-4 items-center justify-center ">
                            <Link to={"/"} className="social-link">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link to={"/"} className="social-link">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link to={"/"} className="social-link">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>
                        © {new Date().getFullYear()} StitchFlow. All rights reserved.
                    </p>
                    <p className="mt-2 md:mt-0">
                        Built with React, Tailwind & MongoDB
                    </p>
                </div>
            </div>
        </footer>
    );
}
