import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import CreateSkill from "../pages/CreateSkill/CreateSkill";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRouter from "./PrivateRouter";
import SkillDetails from "../components/Home/SkillDetails/SkillDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import DefaultPage from "../pages/Dashboard/DefaultPage/DefaultPage";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";
import UserProfile from "../pages/Dashboard/User/UserProfile/UserProfile";
import SavedSkills from "../pages/Dashboard/User/SavedSkills/SavedSkills";
import ExchangeRequests from "../pages/Dashboard/User/ExchangeRequests/ExchangeRequests";
import TaskFeedback from "../pages/Dashboard/User/TaskFeedback/TaskFeedback";
import TrendingSkills from "../pages/TrendingSkills/TrendingSkills";
import UserReports from "../pages/Dashboard/Admin/UserReports";
import ManageCategories from "../pages/Dashboard/Admin/ManageCategories";
import AboutUs from "../pages/AboutUs/AboutUs";
import MySuggestion from "../pages/Dashboard/User/MySuggestion/MySuggestion";
import UserSuggestions from "../pages/Dashboard/Admin/UserSuggestions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/createSkill",
        element: (
          <PrivateRouter>
            <CreateSkill />
          </PrivateRouter>
        ),
      },
      {
        path: "/skillDetails/:id",
        element: (
          <PrivateRouter>
            <SkillDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "/trending",
        element: <TrendingSkills />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <DefaultPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myProfile",
        element: (
          <PrivateRouter>
            <UserProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/manageUsers",
        element: (
          <PrivateRouter>
            <UserManagement />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/userReports",
        element: (
          <PrivateRouter>
            <UserReports />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/manageCategories",
        element: (
          <PrivateRouter>
            <ManageCategories />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin/userSuggestions",
        element: (
          <PrivateRouter>
            <UserSuggestions />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/user/savedSkills",
        element: (
          <PrivateRouter>
            <SavedSkills />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/user/exchangeRequests",
        element: (
          <PrivateRouter>
            <ExchangeRequests />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/user/taskFeedback",
        element: (
          <PrivateRouter>
            <TaskFeedback />
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/user/mySuggestion",
        element: (
          <PrivateRouter>
            <MySuggestion />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
