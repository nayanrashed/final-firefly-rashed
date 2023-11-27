import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layouts/DashBoard";
import MyProfile from "../pages/DashBoard/MyProfile/MyProfile";
import MyPosts from "../pages/DashBoard/MyPosts/MyPosts";
import AddPost from "../pages/DashBoard/AddPost/AddPost";
import AdminHome from "../pages/DashBoard/AdminHome/AdminHome";
import AdminProfile from "../pages/DashBoard/AdminProfile/AdminProfile";
import ManageUsers from "../pages/DashBoard/ManageUsers/ManageUsers";
import ReportedActivities from "../pages/DashBoard/ReportedActivities/ReportedActivities";
import MakeAnnouncements from "../pages/DashBoard/MakeAnnouncements/MakeAnnouncements";
import AdminRoute from "./AdminRoute";
import Comments from "../pages/DashBoard/Comments/Comments";
import Post from "../pages/Post/Post";

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
      {
        path: "posts/:id",
        element: <Post></Post>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/posts/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      // User Routes
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addPost",
        element: <AddPost></AddPost>,
      },
      {
        path: "myPosts",
        element: <MyPosts></MyPosts>,
      },
      {
        path: "comments/:id",
        element: <Comments></Comments>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/posts/${params.id}`),
      },
      // Admin Routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "reportedActivities",
        element: (
          <AdminRoute>
            <ReportedActivities></ReportedActivities>
          </AdminRoute>
        ),
      },
      {
        path: "makeAnnouncements",
        element: (
          <AdminRoute>
            <MakeAnnouncements></MakeAnnouncements>
          </AdminRoute>
        ),
      },
    ],
  },
]);
