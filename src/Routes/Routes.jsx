import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layouts/DashBoard";
import MyProfile from "../pages/DashBoard/MyProfile/MyProfile"
import MyPosts from "../pages/DashBoard/MyPosts/MyPosts";
import AddPost from "../pages/DashBoard/AddPost/AddPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "membership",
        element: (
          <PrivateRoute>
            <Membership></Membership>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "joinUs",
        element: <JoinUs></JoinUs>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    children:[
        {
            path:'myProfile',
            element: <MyProfile></MyProfile>
        },
        {
            path:'addPost',
            element: <AddPost></AddPost>
        },
        {
            path:'myPosts',
            element: <MyPosts></MyPosts>
        }
    ]
    
  },
]);
