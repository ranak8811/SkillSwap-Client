import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="relative md:flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center justify-end relative z-10">
          <div className="flex-1"></div>

          <button
            onClick={toggleSidebar}
            className="text-gray-600 text-2xl md:hidden"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
