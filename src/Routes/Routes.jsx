import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"membership",
                element:<PrivateRoute><Membership></Membership></PrivateRoute>
            },
            {
                path:"login",
                element:<Login></Login>
            },
            {
                path:"joinUs",
                element:<JoinUs></JoinUs>
            }
        ]
    }
])