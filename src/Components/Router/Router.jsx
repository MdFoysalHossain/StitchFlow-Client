import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../../Pages/Root/Root";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";
import CreatePost from "../../Pages/CreatePost/CreatePost";
import PrivateRoute from "./PrivateRoute";
import ManagerRoute from "./ManagerRoute";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import SingleProduct from "../../Pages/SingleProduct/SingleProduct";
import OrderPage from "../../Pages/OrderPage/OrderPage";
import PaymentSuccess from "../../Pages/Payment/PaymentSuccess";
import PaymentFailed from "../../Pages/Payment/PaymentFailed";
import DashboardRoot from "../../Pages/Root/DashboardManagerRoot";
import DashboardManagerRoot from "../../Pages/Root/DashboardManagerRoot";
import DashboardHome from "../../Pages/DashboardManager/DashboardHome/DashboardHome";
import ManageProducts from "../../Pages/DashboardManager/DashboardHome/Components/ManageProducts";
import UpdateProduct from "../../Pages/DashboardManager/UpdateProduct/UpdateProduct";
import PendingApprove from "../../Pages/DashboardManager/PendingApprove/PendingApprove";
import ApprovedOrders from "../../Pages/DashboardManager/ApprovedOrders/ApprovedOrders";
import MyProfile from "../../Pages/MyProfile/MyProfile";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import MyOrderTrack from "../../Pages/MyOrderTrack/MyOrderTrack";
import DashboardAdminRoot from "../../Pages/Root/DashboardAdminRoot";
import AdminHome from "../../Pages/DashboardAdmin/AdminHome";
import AdminRoute from "./AdminRoute";
import AdminAllProducts from "../../Pages/DashboardAdmin/AdminAllProducts/AdminAllProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />,
            },
            {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Register",
                element: <Register />,
            },
            {
                path: "/AllProducts",
                element: <AllProducts />,
            },
            {
                path: "/MyOrders",
                element: <PrivateRoute><MyOrders/> </PrivateRoute>,
            },
            {
                path: "/TrackOrder/:id",
                element: <PrivateRoute><MyOrderTrack/> </PrivateRoute>,
            },
            {
                path: "/CreatePost",
                element: <PrivateRoute><ManagerRoute> <CreatePost /></ManagerRoute></PrivateRoute>,
            },
            {
                path: "/SingleProduct/:id",
                element: <PrivateRoute> <SingleProduct /></PrivateRoute>,
            },
            {
                path: "/OrderProduct/:id",
                element: <PrivateRoute> <OrderPage /></PrivateRoute>,
            },
            {
                path: "/Payment/Payment-successful",
                element: <PaymentSuccess />,
            },
            {
                path: "/Payment/Payment-canceled",
                element: <PaymentFailed />,
            },
            {
                path: "/MyProfile",
                element: <PrivateRoute> <MyProfile /></PrivateRoute>,
            },
        ]
    },
    {
        path: "/Dashboard",
        element: <DashboardManagerRoot />,
        children: [
            {
                index: true,
                
            },
            {
                path: "/Dashboard/Manager",
                element: <PrivateRoute><ManagerRoute> <DashboardHome /></ManagerRoute></PrivateRoute>,
            },
            {
                path: "/Dashboard/Manager/ManagePoducts",
                element: <PrivateRoute><ManagerRoute> <ManageProducts /></ManagerRoute></PrivateRoute>,
            },
            {
                path: "/Dashboard/Manager/UpdateProduct/:id",
                element: <PrivateRoute><ManagerRoute> <UpdateProduct /></ManagerRoute></PrivateRoute>,
            },
            {
                path: "/Dashboard/Manager/PendingApprove",
                element: <PrivateRoute><ManagerRoute> <PendingApprove /></ManagerRoute></PrivateRoute>,
            },
            {
                path: "/Dashboard/Manager/ApprovedOrder",
                element: <PrivateRoute><ManagerRoute> <ApprovedOrders /></ManagerRoute></PrivateRoute>,
            },
        ]
    },
    {
        path: "/Dashboard/",
        element: <DashboardAdminRoot />,
        children: [
            {
                index: true,
            },
            {
                path: "/Dashboard/Admin",
                element: <PrivateRoute><AdminRoute> <AdminHome /></AdminRoute></PrivateRoute>,
            },
            {
                path: "/Dashboard/Admin/AllProducts",
                element: <PrivateRoute><AdminRoute> <AdminAllProducts /></AdminRoute></PrivateRoute>,
            },
        ]
    },
]);

