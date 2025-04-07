import React, { useState } from "react";
import loginLottieData from "../../assets/lottie/login.json";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, loginRegisteredUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const result = await loginRegisteredUser(email, password);
      setUser(result?.user);
      toast.success("Login successful!");
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      toast.error("Invalid email or password.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-[#f9fcfa] text-[#07110c] p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Lottie animationData={loginLottieData} loop className="h-40 mx-auto" />

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54b689]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#54b689]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#54b689] text-white py-2 rounded-md hover:bg-[#459b75] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <button
            className="btn btn-outline w-full flex items-center justify-center mt-2"
            onClick={() => {
              setEmail("admin@example.com");
              setPassword("Admin@123");
            }}
          >
            Use Admin Credentials
          </button>

          <button
            className="btn btn-outline w-full flex items-center justify-center mt-2"
            onClick={() => {
              setEmail("user@example.com");
              setPassword("User@123");
            }}
          >
            Use User Credentials
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            New here?{" "}
            <Link to="/signup" className="text-[#54b689] hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p>Or Sign Up Using</p>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
