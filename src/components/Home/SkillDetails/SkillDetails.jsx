import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../pages/LoadingPage/LoadingPage";
import useAuth from "../../../hooks/useAuth";
import useSingleSkill from "../../../hooks/useSingleSkill";
import useSkillsByEmail from "../../../hooks/useSkillsByEmail";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaShareAlt,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import useRole from "../../../hooks/useRole";
import useTitle from "../../../../public/PageTitle/title";

const SkillDetails = () => {
  useTitle("Skill Details");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [role] = useRole();
  const { id } = useParams();
  const [skill, isSkillLoading] = useSingleSkill(id);
  const [skills, isSkillsLoading] = useSkillsByEmail(user?.email);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: reviewsAndReports = {}, isLoading } = useQuery({
    queryKey: ["reviewsAndReports"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/reviews-and-reports/${id}`
      );
      return data;
    },
  });

  if (isSkillLoading || isSkillsLoading || isLoading) return <LoadingPage />;

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

  const skillUrl = window.location.href;

  let desiredType = type === "offer" ? "request" : "offer";
  const filteredSkills = Array.isArray(skills)
    ? skills.filter((s) => s.type === desiredType && s.available === true)
    : [];

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

  const { reviews, reports } = reviewsAndReports;

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
            {available ? (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <FaCheckCircle /> Available
              </span>
            ) : (
              <span className="text-red-600 font-medium flex items-center gap-1">
                <FaTimesCircle /> Not Available
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

          <div className="flex flex-wrap gap-4 items-center mt-6">
            {user?.email !== creatorEmail && role !== "admin" && available && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#54b689] hover:bg-[#469e75] text-white px-5 py-2 rounded-full flex items-center gap-2"
              >
                <FaExchangeAlt /> Request Exchange
              </button>
            )}

            <FacebookShareButton url={skillUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={skillUrl} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
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

      {/* Reviews Section */}
      {reviews?.length > 0 && (
        <div className="mt-10 bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">Reviews</h3>
          <ul className="space-y-3">
            {reviews.map((rev) => (
              <li key={rev._id} className="border-b pb-2">
                <p className="font-semibold">Rating: {rev.rating}/5</p>
                <p className="text-sm">Comment: {rev.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reports Section */}
      {reports?.length > 0 && (
        <div className="mt-10 bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-red-600">Reports</h3>
          <ul className="space-y-3">
            {reports.map((rep) => (
              <li key={rep._id} className="border-b pb-2">
                <p className="font-semibold">
                  Reported by: {rep.reporterEmail}
                </p>
                <p className="text-sm text-red-500">Reason: {rep.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillDetails;
