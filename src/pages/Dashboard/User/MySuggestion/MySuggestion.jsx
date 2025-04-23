import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useTitle from "../../../../../public/PageTitle/title";

const MySuggestion = () => {
  useTitle("My Suggestion");
  const { user } = useAuth();
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      return toast.error("Please enter your suggestion.");
    }

    const suggestionData = {
      name: user?.displayName || "Anonymous",
      email: user?.email || "Not Provided",
      photoURL: user?.photoURL || "Not Provided",
      suggestion,
      status: "asked",
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user-suggestions`,
        suggestionData
      );

      if (data.insertedId) {
        toast.success("Suggestion submitted successfully!");
        setSuggestion("");
      }
    } catch (error) {
      toast.error("Failed to submit suggestion.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-[#54b689]">
        Your Suggestion
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#54b689] mb-4"
          rows="5"
          placeholder="Suggest any feature or improvement..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-[#54b689] text-white px-6 py-2 rounded-md hover:bg-[#469f74] transition-all"
        >
          Submit Suggestion
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>Name:</strong> {user?.displayName || "Anonymous"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "Not Provided"}
        </p>
      </div>
    </div>
  );
};

export default MySuggestion;
