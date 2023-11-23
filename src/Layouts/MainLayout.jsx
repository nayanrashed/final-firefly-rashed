import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="pt-24 px-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
