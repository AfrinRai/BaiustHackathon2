import React, { useState } from "react";
import Navbar from "./navbar.jsx";
import { Outlet } from "react-router-dom";

function Root() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Navbar open={open} setOpen={setOpen} />

      <div className="flex-1 transition-all duration-300 overflow-auto">
        <Outlet context={{ sidebarOpen: open }} />
      </div>
    </div>
  );
}

export default Root;

