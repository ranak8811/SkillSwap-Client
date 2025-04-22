import React from "react";
import logo from "../../assets/skill.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f9fcfa] text-[#07110c] border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SkillSwap Logo" className="w-10" />
            <span className="text-2xl font-bold text-[#54b689]">SkillSwap</span>
          </div>
          <p className="text-sm mt-2">
            Empowering users to exchange skills, grow together, and build a
            connected learning community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#54b689]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/skills" className="hover:text-[#54b689]">
                Skills
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#54b689]">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#54b689]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq" className="hover:text-[#54b689]">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#54b689]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#54b689]">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl text-primaryy">
            <a
              href="https://www.facebook.com/ranaf8811"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/ranak8811"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ranak8811/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/ranak8811"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-gray-200">
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
