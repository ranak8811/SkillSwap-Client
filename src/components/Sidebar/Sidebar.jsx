import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/skill.png";

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
  { path: "/dashboard/admin/manageSkills", name: "Manage Skills" },
];

const Sidebar = ({ isSidebarOpen }) => {
  const [role] = useRole();
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const links =
    role === "admin" ? adminLinks : role === "user" ? userLinks : [];

  const activeClassName = "bg-primaryy text-white";
  const defaultClassName =
    "flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-700";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between h-screen bg-gray-50 border-r rtl:border-r-0 rtl:border-l border-gray-200 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 px-5 py-8 md:relative md:translate-x-0 md:border-r md:border-gray-200`}
    >
      <div>
        <div className="mb-6">
          <Link to={"/"} className="flex items-center gap-2 px-3">
            <img src={logo} alt="SkillSwap Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-primaryy">SkillSwap</span>
          </Link>
        </div>

        <nav className="-mx-3 space-y-2">
          {commonLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end // Use 'end' for the dashboard home link to avoid partial matching
              className={({ isActive }) =>
                `${defaultClassName} ${isActive ? activeClassName : ""}`
              }
            >
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
              <span className="mx-2 font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3 p-3 border-t border-gray-200">
          {" "}
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={
              user?.photoURL ||
              `https://via.placeholder.com/150?text=${
                user?.displayName?.charAt(0) || "U"
              }`
            }
            alt="User avatar"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              {" "}
              {user?.displayName || "User Name"}
            </h2>
            <span className="text-xs text-gray-500 capitalize">
              {" "}
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
