import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../LoadingPage/LoadingPage";
import useTitle from "../../../../public/PageTitle/title";

const UserSuggestions = () => {
  useTitle("User Suggestions");
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const suggestionsPerPage = 6;

  const {
    data: suggestions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userSuggestions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-suggestions`
      );
      return data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user-suggestions/${id}`,
        {
          status,
        }
      );
      refetch();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (isLoading) return <LoadingPage />;

  // Filter by email
  const filteredSuggestions = suggestions.filter((s) =>
    s.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  // Paginate the filtered suggestions
  const totalPages = Math.ceil(filteredSuggestions.length / suggestionsPerPage);
  const start = (currentPage - 1) * suggestionsPerPage;
  const end = start + suggestionsPerPage;
  const paginatedSuggestions = filteredSuggestions.slice(start, end);
  // console.log(paginatedSuggestions); // Keep console log commented out or remove

  // Group the *paginated* suggestions by status
  const groupedSuggestions = {
    asked: [],
    "maybe later": [],
    done: [],
  };

  paginatedSuggestions.forEach((s) => {
    // Iterate over paginatedSuggestions
    if (groupedSuggestions[s.status]) {
      groupedSuggestions[s.status].push(s);
    }
  });

  const renderSuggestionCard = (item) => (
    <div
      key={item._id}
      className="border rounded-xl p-4 flex flex-col gap-2 shadow-sm bg-white"
    >
      <div className="flex items-center gap-4">
        <img
          src={item.photoURL}
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-lg">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      </div>
      <p className="text-gray-700">{item.suggestion}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-medium">Status:</span>
        <select
          className="select select-bordered select-sm"
          value={item.status}
          onChange={(e) => handleStatusChange(item._id, e.target.value)}
          disabled={item.status === "done"}
        >
          <option value="asked">Asked</option>
          <option value="maybe later">Maybe Later</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );

  // totalPages calculation moved up before slicing

  return (
    // Add centering container
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">User Suggestions</h2>

      {/* Center the search bar as well */}
      <div className="form-control mb-6 max-w-md mx-auto">
        <label className="label">
          <span className="label-text">Search by Email</span>
        </label>
        <input
          type="text"
          placeholder="Enter user email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {["asked", "maybe later", "done"].map((status) => (
        <div key={status} className="mb-8">
          {/* Use the custom class for title color */}
          <h3 className="text-2xl font-semibold capitalize mb-3 text-primary">
            {" "}
            {/* Reverted title color change */}
            {status}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {" "}
            {/* Adjusted grid for potentially 3 columns */}
            {groupedSuggestions[status].length > 0 ? (
              groupedSuggestions[status].map((item) =>
                renderSuggestionCard(item)
              )
            ) : (
              <p className="text-gray-500">No suggestions in this category.</p>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="join">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`join-item btn btn-sm ${
                currentPage === num + 1
                  ? "btn-primary text-white"
                  : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSuggestions;
