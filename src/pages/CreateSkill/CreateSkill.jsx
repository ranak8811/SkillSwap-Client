import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../LoadingPage/LoadingPage";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import useCategories from "../../hooks/useCategories";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../public/PageTitle/title";

// const defaultCategories = ["Programming", "Teaching", "Gardening"];

const CreateSkill = () => {
  useTitle("Create Skill");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    category: "",
    type: "offer",
    swapWith: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, isLoading] = useCategories();

  if (isLoading) return <LoadingPage />;

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "swapWith") {
      const updatedSwapWith = checked
        ? [...formData.swapWith, value]
        : formData.swapWith.filter((cat) => cat !== value);
      setFormData((prev) => ({ ...prev, swapWith: updatedSwapWith }));
    } else if (name === "image") {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = await imageUpload(formData.image);
      const skillData = {
        title: formData.title,
        image: imageUrl,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        available: true,
        creatorEmail: user?.email,
        creatorName: user?.displayName,
        creatorImage: user?.photoURL,
        createdAt: new Date().toISOString(),
        swapWith: formData.swapWith,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/create-skills`,
        skillData
      );
      toast.success("Skill created successfully!");
      setFormData({
        title: "",
        image: null,
        description: "",
        category: "",
        type: "offer",
        swapWith: [],
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 p-4 md:p-8 max-w-3xl mx-auto bg-backgroundd text-textt rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create a New Skill
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Skill Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full border-secondaryy"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Skill Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            onChange={handleChange}
            className="file-input w-full border-secondaryy"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full border-secondaryy"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full border-secondaryy"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Swap With (Select one or more)
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label key={cat._id} className="label cursor-pointer">
                <input
                  type="checkbox"
                  name="swapWith"
                  value={cat.name}
                  checked={formData.swapWith.includes(cat.name)}
                  onChange={handleChange}
                  className="checkbox checkbox-sm checkbox-primaryy"
                />
                <span className="ml-2">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Type</label>
          <div className="flex gap-4">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="type"
                value="offer"
                checked={formData.type === "offer"}
                onChange={handleChange}
                className="radio radio-primaryy"
              />
              <span className="ml-2">Offer</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="type"
                value="request"
                checked={formData.type === "request"}
                onChange={handleChange}
                className="radio radio-primaryy"
              />
              <span className="ml-2">Request</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-primaryy text-white w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Skill"}
        </button>
      </form>
    </div>
  );
};

export default CreateSkill;
