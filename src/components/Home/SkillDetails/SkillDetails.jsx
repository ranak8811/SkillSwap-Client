import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../pages/LoadingPage/LoadingPage";
import useAuth from "../../../hooks/useAuth";
import useSingleSkill from "../../../hooks/useSingleSkill";
import useSkillsByEmail from "../../../hooks/useSkillsByEmail";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEnvelope, FaExchangeAlt, FaCheckCircle } from "react-icons/fa";

const SkillDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [skill, isLoading] = useSingleSkill(id);
  const [skills] = useSkillsByEmail(user?.email);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <LoadingPage />;

  const {
    _id,
    title,
    description,
    image,
    category,
    type,
    available,
    creatorName,
    creatorImage,
    creatorEmail,
    swapWith,
    createdAt,
  } = skill;

  let desiredType = type === "offer" ? "request" : "offer";
  const filteredSkills = skills.filter(
    (s) => s.type === desiredType && s.available === true
  );

  const handleExchange = async () => {
    if (!selectedSkillId || !message) {
      toast.error("Please select a skill and write a message.");
      return;
    }

    const exchangeData = {
      title,
      creatorSkillCategory: category,
      creatorEmail,
      applicationUserEmail: user?.email,
      creatorSkillId: _id,
      applicationSkillId: selectedSkillId,
      message,
      status: "Pending",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/exchanges`,
        exchangeData
      );
      toast.success("Exchange request sent successfully!");
      setIsModalOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send exchange request.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 text-[#07110c]">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={creatorImage}
              alt={creatorName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{creatorName}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(createdAt), "PPpp")}
              </p>
            </div>
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-700 whitespace-pre-line">{description}</p>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-[#54b689] text-white px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="bg-[#d3a0d6] text-white px-3 py-1 rounded-full capitalize">
              {type}
            </span>
            {available && (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <FaCheckCircle /> Available
              </span>
            )}
          </div>

          <div className="mt-3">
            <h4 className="font-semibold">Wants to swap with:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {swapWith.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#c67a8b] text-white px-3 py-1 rounded-full text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-[#54b689] hover:bg-[#469e75] text-white px-5 py-2 rounded-full flex items-center gap-2"
          >
            <FaExchangeAlt /> Request Exchange
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-[#07110c]">
              Exchange Request
            </h2>

            <p>
              <strong>Skill:</strong> {title}
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>

            <label className="block mt-3 text-sm font-medium">
              Message to Creator:
            </label>
            <textarea
              className="w-full border rounded-md p-2 mt-1 text-sm"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            ></textarea>

            <label className="block mt-3 text-sm font-medium">
              Select your skill to exchange:
            </label>
            <select
              className="w-full border p-2 rounded-md mt-1 text-sm"
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {filteredSkills.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.title} ({s.category})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleExchange}
                className="px-4 py-2 bg-[#54b689] text-white rounded-md hover:bg-[#469e75]"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDetails;
