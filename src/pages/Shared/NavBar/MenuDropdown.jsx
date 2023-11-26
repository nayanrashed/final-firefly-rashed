import avatar from "../../../assets/avatar.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import useAdmin from "../../../hooks/useAdmin";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  // const [isAdmin] = useAdmin();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className="relative">
      {/* Dropdown btn */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="md:p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <div className="md:block">
          {/* Avatar */}
          {user ? (
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={user?.photoURL}
              alt="profile"
              height="30"
              width="30"
            />
          ) : (
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={avatar}
              alt="profile"
              height="30"
              width="30"
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <div className="px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold">
              {user?.displayName && <p>{user?.displayName}</p>}
            </div>
            {/* {user && isAdmin && (
              <Link
                to="/dashboard/adminHome"
                className="px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold"
              >
                Dashboard
              </Link>
            )}
            {user && !isAdmin && (
              <Link
                to="/dashboard/myProfile"
                className="px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold"
              >
                Dashboard
              </Link>
            )} */}

            <Link
              to="/dashboard/myProfile"
              className="px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold"
            >
              Dashboard
            </Link>

            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
