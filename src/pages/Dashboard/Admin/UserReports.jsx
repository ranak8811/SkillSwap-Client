import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UserReports = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const {
    data: allReports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/all-reports`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingPage />;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This report will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/delete-report/${id}`
          );
          if (data.deletedCount) {
            toast.success("Report deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Error deleting report");
          console.log(error);
        }
      }
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(allReports.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = allReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Reports</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Reporter Email</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Skill</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report, index) => (
              <tr key={report._id} className="hover:bg-gray-50">
                <td className="p-2">{indexOfFirstReport + index + 1}</td>
                <td className="p-2">{report.reporterEmail}</td>
                <td className="p-2">{report.reason}</td>
                <td className="p-2">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => navigate(`/skillDetails/${report.skillId}`)}
                  >
                    View Skill
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === num + 1 ? "bg-green-600 text-white" : "bg-white"
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

export default UserReports;
