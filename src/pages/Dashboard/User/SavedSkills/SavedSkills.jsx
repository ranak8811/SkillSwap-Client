import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SavedSkills = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 10;

  const {
    data: savedData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["savedSkills", user?.email, currentPage, searchTerm],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-saved-skills`,
        {
          params: {
            email: user.email,
            page: currentPage,
            limit: skillsPerPage,
            search: searchTerm,
          },
        }
      );
      return data;
    },
  });

  const totalSkills = savedData.total || 0;
  const savedSkills = savedData.skills || [];
  const totalPages = Math.ceil(totalSkills / skillsPerPage);

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
            `${import.meta.env.VITE_API_URL}/delete-saved-skill/${id}`
          );
          if (data.deletedCount) {
            toast.success("Skill deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Error deleting skill: ", error);
        }
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Saved Skills</h2>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-64"
        />
        <button type="submit" className="btn bg-[#54b689] text-white">
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedSkills.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No saved skills found.
                </td>
              </tr>
            ) : (
              savedSkills.map((skill, index) => (
                <tr key={skill._id}>
                  <td>{index + 1}</td>
                  <td>{skill.skillTitle}</td>
                  <td>{skill.skillCategory}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => navigate(`/skillDetails/${skill.skillId}`)}
                      className="btn btn-sm bg-[#54b689] text-white"
                    >
                      See Details
                    </button>
                    <button
                      onClick={() => handleDelete(skill.skillId)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`btn btn-sm ${
                currentPage === num + 1
                  ? "bg-[#54b689] text-white"
                  : "bg-gray-200"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSkills;
