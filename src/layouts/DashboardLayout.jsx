import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/skill.png"; // Assuming logo path is correct
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for toggle

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to not open

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          {/* Left side: Toggle Button and Logo/Name */}
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-gray-600 text-2xl">
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            {/* Show logo/name here only if sidebar is closed or on small screens where sidebar overlays */}
            {/* Or always show it as requested */}
            <div className="">
              <Link to={"/"} className="flex items-center gap-2">
                <img src={logo} alt="SkillSwap Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-primaryy hidden sm:inline">
                  SkillSwap
                </span>
              </Link>
            </div>
          </div>

          {/* Optional: Right side of header (e.g., notifications, user menu) */}
          <div>{/* Placeholder for other header content */}</div>
        </header>

        {/* Page Content */}
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-0 md:ml-64" : "ml-0" // Adjust margin based on sidebar state for medium screens and up
          }`}
        >
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
