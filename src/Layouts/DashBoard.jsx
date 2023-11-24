import { FaPersonCircleCheck } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { FcComments } from "react-icons/fc";
import { LiaComments } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashBoard = () => {
    const { user, logOut } = useAuth();
    console.log(user);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen pt-6 bg-amber-400">
        <ul className="menu">
          <li>
            <NavLink to="/dashboard/myProfile">
              <FaPersonCircleCheck></FaPersonCircleCheck>
              My Profile{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addPost">
              <FcComments />
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myPosts">
              <LiaComments />
              My Posts
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
          <button
                  onClick={handleLogout}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Logout
                </button>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 pt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
