import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SkillCard = ({ skill }) => {
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
    createdAt,
  } = skill;

  const navigate = useNavigate();

  // Function to truncate description to 20 words
  const truncateDescription = (text) => {
    const words = text.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
  };

  return (
    <div
      onClick={() => navigate(`/skill/${_id}`)}
      className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-[#f0f0f0] max-w-xl mx-auto"
    >
      {/* Image */}
      <div className="h-52 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Top Row: Category and Date */}
        <div className="flex justify-between text-sm text-gray-500">
          <span className="bg-[#54b689] text-white px-3 py-1 rounded-full text-xs">
            {category}
          </span>
          <span>{format(new Date(createdAt), "PPpp")}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#07110c]">{title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-700">
          {truncateDescription(description)}
        </p>

        {/* Type and Availability */}
        <div className="flex justify-between items-center gap-2">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              type === "offer"
                ? "bg-[#d3a0d6] text-[#07110c]"
                : "bg-[#c67a8b] text-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          {available ? (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
              Not Available
            </span>
          )}
        </div>

        {/* Creator */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={creatorImage}
            alt={creatorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">
            {creatorName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
