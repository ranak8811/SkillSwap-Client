import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../../../../../public/PageTitle/title";
import SearchPagination from "../../../../components/SearchPagination";

const ExchangeRequests = () => {
  useTitle("Exchange Requests");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["exchangeRequests", user?.email, search, currentPage, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/exchanges/${user?.email}`,
        {
          params: {
            search,
            page: currentPage,
            limit,
          },
        }
      );
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status, creatorSkillId, applicationSkillId }) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/exchanges/${id}`,
        { status, creatorSkillId, applicationSkillId }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Status updated!");
      queryClient.invalidateQueries(["exchangeRequests"]);
    },
    onError: () => toast.error("Failed to update status."),
  });

  if (isLoading) return <LoadingPage />;

  const totalPages = Math.ceil((data.total || 0) / limit);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Exchange Requests</h2>
      <SearchPagination
        searchTerm={search}
        setSearchTerm={setSearch}
        page={currentPage}
        setPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={totalPages}
        onSearch={handleSearch}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-md text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Navigate</th>
            </tr>
          </thead>
          <tbody>
            {data.requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No exchange requests found.
                </td>
              </tr>
            ) : (
              data.requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{req.title}</td>
                  <td>{req.message}</td>
                  <td>
                    <select
                      value={req.status}
                      disabled={req.status === "Accepted"}
                      onChange={(e) =>
                        mutation.mutate({
                          id: req._id,
                          status: e.target.value,
                          creatorSkillId: req.creatorSkillId,
                          applicationSkillId: req.applicationSkillId,
                        })
                      }
                      className="select select-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() =>
                        navigate(`/skillDetails/${req.creatorSkillId}`)
                      }
                      className="btn btn-sm bg-[#54b689] text-white"
                    >
                      My Skill
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/skillDetails/${req.applicationSkillId}`)
                      }
                      className="btn btn-sm bg-[#d3a0d6] text-white"
                    >
                      Swap Skill
                    </button>
                  </td>
                  <td>
                    <span className="badge bg-accent text-white">
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Pagination handled by SearchPagination */}
    </div>
  );
};

export default ExchangeRequests;
