import React from "react";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../LoadingPage/LoadingPage";
import useTitle from "../../../../public/PageTitle/title";

// Placeholder icons (replace with actual icons/logos later)
const ManageUsersIcon = () => <span>[👥]</span>;
const ManageCategoriesIcon = () => <span>[🏷️]</span>;
const UserReportsIcon = () => <span>[📊]</span>;
const UserProfileIcon = () => <span>[👤]</span>;
const AddSkillIcon = () => <span>[➕]</span>;
const SavedSkillsIcon = () => <span>[💾]</span>;
const ExchangeRequestsIcon = () => <span>[🔄]</span>;
const TaskFeedbackIcon = () => <span>[⭐]</span>;

const DefaultPage = () => {
  useTitle("Dashboard");
  const { user } = useAuth();
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to your Dashboard, {user?.displayName || "User"}!
      </h1>
      <p className="text-lg text-center mb-8">
        Here's what you can do as a{role === "admin" ? "n Admin" : " User"}:
      </p>

      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <ManageUsersIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
              <p className="text-gray-600">
                View, manage, and update user roles.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <ManageCategoriesIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">Manage Categories</h2>
              <p className="text-gray-600">
                Add, edit, or remove skill categories.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <UserReportsIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">User Reports</h2>
              <p className="text-gray-600">
                Review reports submitted by users.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <UserProfileIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">View Profile</h2>
              <p className="text-gray-600">
                View and manage your own profile details.
              </p>
            </div>
          </div>
        </div>
      )}

      {role === "user" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <AddSkillIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">Add Skill</h2>
              <p className="text-gray-600">Offer a new skill for exchange.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <SavedSkillsIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">Saved Skills</h2>
              <p className="text-gray-600">View skills you have saved.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <ExchangeRequestsIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">Exchange Requests</h2>
              <p className="text-gray-600">
                Manage incoming and outgoing skill exchange requests.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <TaskFeedbackIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">Task Feedback</h2>
              <p className="text-gray-600">
                Provide feedback on completed skill exchanges.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <UserProfileIcon />
            <div>
              <h2 className="text-xl font-semibold mb-2">View Profile</h2>
              <p className="text-gray-600">
                View and manage your own profile details.
              </p>
            </div>
          </div>
        </div>
      )}

      {!role && !isLoading && (
        <div className="text-center text-red-500 mt-8">
          Could not determine user role. Please contact support if this issue
          persists.
        </div>
      )}
    </div>
  );
};

export default DefaultPage;
