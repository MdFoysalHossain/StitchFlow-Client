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
                path: "/CreatePost",
                element: <ManagerRoute> <CreatePost /></ManagerRoute>,
            },
            {
                path: "/SingleProduct/:id",
                element: <PrivateRoute> <SingleProduct /></PrivateRoute>,
            },
        ]
    },
]);

