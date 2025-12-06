import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../../Pages/Root/Root";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Auth/Login/Login";
import Register from "../../Pages/Auth/Register/Register";

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
        ]
    },
]);

