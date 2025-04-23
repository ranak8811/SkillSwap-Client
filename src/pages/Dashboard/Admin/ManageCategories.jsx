import React, { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import LoadingPage from "../../LoadingPage/LoadingPage";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import useTitle from "../../../../public/PageTitle/title";

const ManageCategories = () => {
  useTitle("Manage Categories");
  const [categories, isLoading, refetch] = useCategories();
  const [newCategory, setNewCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  if (isLoading) return <LoadingPage />;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#54b689",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/categories/${id}`
          );
          if (data.deletedCount) {
            toast.success("Category deleted successfully!");
            refetch();
          }
        } catch (error) {
          toast.error("Failed to delete category");
          console.log(error);
        }
      }
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return toast.error("Category name is required");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          name: newCategory,
        }
      );
      if (data.insertedId) {
        toast.success("Category added!");
        setNewCategory("");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add category");
      console.log(error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Add Category */}
      <form
        onSubmit={handleAddCategory}
        className="mb-6 flex items-center gap-4"
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn bg-[#54b689] text-white">
          Add
        </button>
      </form>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Category Name</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="p-2">{indexOfFirstCategory + index + 1}</td>
                <td className="p-2">{category.name}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(category._id)}
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
                currentPage === num + 1 ? "bg-[#54b689] text-white" : "bg-white"
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

export default ManageCategories;
