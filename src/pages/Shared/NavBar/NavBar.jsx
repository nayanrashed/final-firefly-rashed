import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import { FaBell } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAnnouncements from "../../../hooks/useAnnouncements";

const NavBar = () => {
  const {user}=useAuth();
  const [announcements]=useAnnouncements()
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/membership">Membership</Link>
      </li>
      <li>
        <Link to="/">
          <FaBell></FaBell>
          <div className="badge badge-secondary">{announcements.length}</div>
        </Link>
      </li>
      {
        !user&&<li>
        <Link to="/login">Join Us</Link>
      </li>
      }
    </>
  );
  return (
    <div className="fixed max-w-screen-xl w-full bg-white z-10 shadow-sm px-2">
      <div className="py-4 border-b-[1px]">
        <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
          {/* Logo */}
          <Link to="/">
            <div className="flex">
              <img className="" src={logo} alt="logo" width="50" height="50" />
              <p className="text-5xl font-semibold pl-4 hidden md:block">
                firefly
              </p>
            </div>
          </Link>

          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          {/* Dropdown Menu */}
          <MenuDropdown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
