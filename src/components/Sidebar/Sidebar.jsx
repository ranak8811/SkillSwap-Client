import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa"; // Icon for logout

// Example placeholder links - replace with actual dashboard routes
const commonLinks = [
  { path: "/dashboard", name: "Dashboard Home" },
  // Add other common links if any
];

const userLinks = [
  { path: "/dashboard/myProfile", name: "My Profile" },
  { path: "/createSkill", name: "Add Skill" },
  { path: "/dashboard/user/savedSkills", name: "Saved Skills" },
  { path: "/dashboard/user/exchangeRequests", name: "Exchange Requests" },
  { path: "/dashboard/user/taskFeedback", name: "Tasks Feedback" },
];

const adminLinks = [
  { path: "/dashboard/myProfile", name: "My Profile" },
  { path: "/dashboard/admin/manageUsers", name: "Manage Users" },
  { path: "/dashboard/admin/manageSkills", name: "Manage Skills" }, // Example
];

const Sidebar = ({ isSidebarOpen }) => {
  const [role] = useRole();
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        navigate("/login"); // Redirect to login after logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Handle logout error (e.g., show a notification)
      });
  };

  // Determine links based on role
  const links =
    role === "admin" ? adminLinks : role === "user" ? userLinks : [];

  const activeClassName = "bg-primaryy text-white"; // Style for active links
  const defaultClassName =
    "flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between h-screen bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64 px-5 py-8" : "w-0 p-0 overflow-hidden" // Adjust width and padding
      } md:relative md:translate-x-0 md:w-64 md:px-5 md:py-8 ${
        // On medium screens and up, it's always relative
        isSidebarOpen
          ? "md:translate-x-0"
          : "md:-translate-x-full md:w-0 md:p-0" // Slide out on md+ screens when closed
      }`}
    >
      <div>
        {/* Navigation Links */}
        {/* Logo/Name is now handled in DashboardLayout's header */}
        <nav className="-mx-3 space-y-2 pt-4">
          {" "}
          {/* Added padding-top */}
          {commonLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end // Use 'end' for the dashboard home link to avoid partial matching
              className={({ isActive }) =>
                `${defaultClassName} ${isActive ? activeClassName : ""}`
              }
            >
              {/* Add icons later if needed */}
              <span className="mx-2 font-medium">{link.name}</span>
            </NavLink>
          ))}
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${defaultClassName} ${isActive ? activeClassName : ""}`
              }
            >
              {/* Add icons later if needed */}
              <span className="mx-2 font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile and Logout */}
      <div className="mt-6">
        <div className="flex items-center gap-3 p-3 border-t dark:border-gray-700">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={
              user?.photoURL ||
              `https://via.placeholder.com/150?text=${
                user?.displayName?.charAt(0) || "U"
              }`
            } // Placeholder if no photo
            alt="User avatar"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user?.displayName || "User Name"}
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {role || "Role"}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={`${defaultClassName} w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-700`}
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="mx-2 font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
