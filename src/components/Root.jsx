import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Navbar />
      <div >
        <Outlet />
      </div>
    </>
  );
}

export default Root;
