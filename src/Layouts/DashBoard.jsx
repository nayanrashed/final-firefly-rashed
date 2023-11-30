import { FaBullhorn, FaPerson, FaPersonCircleCheck, FaUsers } from "react-icons/fa6";
import { MdOutlineReport } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FcComments } from "react-icons/fc";
import { LiaComments } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { IoMenu } from "react-icons/io5";
import logo from "../assets/logo.png";

const DashBoard = () => {
  const { logOut } = useAuth();

  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="z-50 drawer lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-between m-2 p-2 border-b border-amber-400">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn  btn-sm drawer-button bg-amber-400">
            <IoMenu /> Dashboard
          </label>
         <Link to='/'> <img className="w-10 h-10 rounded-full" src={logo} alt="" /></Link>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <ul className="menu">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <FaPersonCircleCheck></FaPersonCircleCheck>
                      Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myProfile">
                    <FaPerson />
                      My Profile
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
                  <li>
                    <NavLink to="/dashboard/manageUsers">
                    <FaUsers />
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/reportedActivities">
                      <MdOutlineReport/>
                      Reported Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/makeAnnouncements">
                      <FaBullhorn/>
                      Make Announcements
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/dashboard/myProfile">
                    <FaPerson />
                      My Profile
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
                </>
              )}
              <div className="divider"></div>
              {/* common links */}
              <li>
                <NavLink
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  to="/"
                >
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
          </ul>
        </div>
      </div>

      <div className="md:flex">
        {/* dashboard side bar */}
        <div className="hidden lg:block w-64 md:min-h-screen pt-4 bg-amber-400">
          <ul className="menu">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaPersonCircleCheck></FaPersonCircleCheck>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myProfile">
                  <FaPerson />
                    My Profile
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
                <li>
                  <NavLink to="/dashboard/manageUsers">
                  <FaUsers />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reportedActivities">
                  <MdOutlineReport/>
                    Reported Activities
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/makeAnnouncements">
                  <FaBullhorn/>
                    Make Announcements
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/myProfile">
                    <FaPersonCircleCheck></FaPersonCircleCheck>
                    My Profile
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
              </>
            )}
            <div className="divider"></div>
            {/* common links */}
            <li>
              <NavLink
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                to="/"
              >
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
        <div className="flex-1 p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
