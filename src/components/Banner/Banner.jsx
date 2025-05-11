import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  FaInfoCircle,
  FaQuestionCircle,
  FaCog,
  FaLink,
  FaTimes, // Icon for closing
} from "react-icons/fa"; // Import icons
import banner1 from "../../assets/banner/banner1.webp";
import banner2 from "../../assets/banner/banner2.webp";
import banner3 from "../../assets/banner/banner3.webp";
import banner4 from "../../assets/banner/banner4.webp";
import banner5 from "../../assets/banner/banner5.webp";
import LoadingPage from "../../pages/LoadingPage/LoadingPage";
import useCategories from "../../hooks/useCategories";

const banners = [banner1, banner2, banner3, banner4, banner5];

// Corner content data (example)
const cornerContents = {
  topLeft: {
    icon: FaInfoCircle,
    title: "About SkillSwap",
    text: "Learn more about our mission and how skill sharing works.",
    buttonText: "Read More",
    buttonLink: "/#about",
  },
  topRight: {
    icon: FaQuestionCircle,
    title: "Need Help?",
    text: "Find answers to common questions in our FAQ section.",
    buttonText: "Visit FAQ",
    buttonLink: "/#faq",
  },
  bottomLeft: {
    icon: FaCog,
    title: "Settings",
    text: "Customize your profile and notification preferences.",
    buttonText: "Go to Settings",
    buttonLink: "/#profile/settings", // Example link
  },
  bottomRight: {
    icon: FaLink,
    title: "Useful Links",
    text: "Explore resources and connect with the community.",
    buttonText: "Explore",
    buttonLink: "/#resources", // Example link
  },
};

const Banner = () => {
  const [categories, isLoading] = useCategories();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCorner, setActiveCorner] = useState(null); // State for active corner
  const [showMainContent, setShowMainContent] = useState(true); // Toggle for main content

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCornerClick = (corner) => {
    setActiveCorner((prev) => (prev === corner ? null : corner));
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full overflow-hidden flex justify-center items-center">
      {/* Background images */}
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`banner-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#00000060] z-0"></div>

      {/* Toggle Button for Main Content */}
      <button
        className="absolute top-6 right-1/2 translate-x-1/2 z-30 bg-black/60 text-white px-4 py-2 rounded-full shadow-lg hover:bg-black/80 transition"
        onClick={() => setShowMainContent((prev) => !prev)}
        aria-label={showMainContent ? "Hide banner content" : "Show banner content"}
      >
        {showMainContent ? "Hide Banner Content" : "Show Banner Content"}
      </button>

      {/* Main Content Container (Centered) */}
      {showMainContent && (
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full w-full max-w-6xl px-6 md:px-10 py-8">
          {/* Overlay behind text/button container for better visibility */}
          <div className="absolute inset-0 md:inset-y-0 md:left-0 md:w-2/3 bg-black/70 rounded-2xl blur-sm z-[-1] mx-2 md:mx-0"></div>
          {/* Left side: text and button */}
          <div className="text-white max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Typewriter
                words={[
                  "Welcome to SkillSwap",
                  "Share Skills",
                  "Request Help",
                  "Learn & Grow",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p className="text-lg mb-6">
              A unique platform to exchange skills through offering and
              requesting. SkillSwap is a web platform designed to facilitate the
              exchange of skills between users. It allows individuals to offer
              their abilities and request help from others, fostering a
              community-driven environment for learning and collaboration.
            </p>
            <div className="flex gap-4 items-center">
              <div>
                <a href="#skills-section">
                  <button className="bg-[#54b689] hover:bg-[#439e76] text-white font-semibold px-6 py-3 rounded-xl transition">
                    Go to Skills Section
                  </button>
                </a>
              </div>

              <div className="relative mt-8 md:mt-0">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="btn-outline bg-white hover:bg-[#54b689] hover:text-white text-[#07110c] font-medium px-6 py-3 rounded-xl transition"
                >
                  All Categories
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 max-h-60 overflow-y-auto z-50">
                    {categories.map((cat) => (
                      <div
                        key={cat._id}
                        className="px-4 py-2 hover:bg-[#f9fcfa] cursor-pointer border-b text-gray-800"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side: category dropdown */}
        </div>
      )}

      {/* Corner Icons and Content */}
      {Object.entries(cornerContents).map(([cornerKey, content]) => {
        const Icon = content.icon;
        const isActive = activeCorner === cornerKey;

        // Define positions based on cornerKey
        let iconPosition = "";
        let contentPosition = "";
        let contentTransformOrigin = "";
        switch (cornerKey) {
          case "topLeft":
            iconPosition = "top-4 left-4";
            contentPosition = "top-16 left-4"; // Position content below icon
            contentTransformOrigin = "origin-top-left";
            break;
          case "topRight":
            iconPosition = "top-4 right-4";
            contentPosition = "top-16 right-4";
            contentTransformOrigin = "origin-top-right";
            break;
          case "bottomLeft":
            iconPosition = "bottom-4 left-4";
            contentPosition = "bottom-16 left-4"; // Position content above icon
            contentTransformOrigin = "origin-bottom-left";
            break;
          case "bottomRight":
            iconPosition = "bottom-4 right-4";
            contentPosition = "bottom-16 right-4";
            contentTransformOrigin = "origin-bottom-right";
            break;
          default:
            break;
        }

        return (
          <div key={cornerKey} className={`absolute ${iconPosition} z-20`}>
            {/* Corner Icon */}
            <button
              onClick={() => handleCornerClick(cornerKey)}
              className="p-3 bg-white/80 hover:bg-white rounded-full text-[#439e76] text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
              aria-label={content.title}
            >
              <Icon />
            </button>

            {/* Corner Content Box */}
            <div
              className={`absolute ${contentPosition} w-64 bg-white/95 p-4 rounded-lg shadow-xl text-gray-800 transition-all duration-500 ease-in-out ${contentTransformOrigin} ${
                isActive
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <button
                onClick={() => handleCornerClick(cornerKey)} // Close button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
              <p className="text-sm mb-3">{content.text}</p>
              {content.buttonText && content.buttonLink && (
                <a
                  href={content.buttonLink}
                  className="inline-block bg-[#54b689] hover:bg-[#439e76] text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
                >
                  {content.buttonText}
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
