import avatar from "../../../assets/avatar.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const { user } = useAuth()
  return (
    <div className="relative">
      {/* Dropdown btn */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="md:p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <div className="md:block">
          {/* Avatar */}
          <img
            className="rounded-full"
            referrerPolicy="no-referrer"
            src={avatar}
            alt="profile"
            height="30"
            width="30"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <p className="px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold">
              {" "}
              User Name
            </p>

            <Link
              to="/dashboard"
              className="px-4 py-3 text-center hover:bg-neutral-100 transition font-semibold"
            >
              Dashboard
            </Link>
            <button className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
