import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { Tooltip } from "react-tooltip";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/allUsers`);
      return data;
    },
  });

  if (isLoading) return <LoadingPage />;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/delete-user/${id}`
          );
          if (data.deletedCount) {
            toast.success("User deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Error deleting user");
          console.log(error);
        }
      }
    });
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/make-admin/${id}`,
        { role: newRole }
      );
      if (data.modifiedCount > 0) {
        toast.success("User role updated");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update role");
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by username"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 transition"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={`📍 Location: ${user.location || "N/A"}
🧾 Bio: ${user.bio || "N/A"}
📅 Joined: ${new Date(user.timestamp).toLocaleDateString()}`}
              >
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-bordered"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    disabled={user.role === "admin"}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-error text-white btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Tooltip id="user-tooltip" place="top" effect="solid" multiline />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "bg-[#54b689] text-white" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
