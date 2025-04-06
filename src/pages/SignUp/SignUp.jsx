import React, { useState } from "react";
import Lottie from "lottie-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import registerLottieData from "../../assets/lottie/register.json";
import { imageUpload, saveUserToDatabase } from "../../api/utils";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const { registerNewUser, updateUserProfile } = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email format";
    if (
      !data.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
    ) {
      newErrors.password =
        "Password must be at least 6 characters and include one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!data.image) newErrors.image = "Profile image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    setData({ ...data, image: e.target?.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const photoURL = await imageUpload(data.image);
      // Wait for user creation to complete
      await registerNewUser(data?.email, data?.password);
      // Now update the profile for the newly created user
      await updateUserProfile({ displayName: data?.name, photoURL });
      await saveUserToDatabase({
        name: data?.name,
        email: data?.email,
        photoURL,
      });
      console.log(data);
      console.log(photoURL);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Failed to register. Try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-[#f9fcfa] p-4">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-[#07110c]">
          Sign Up
        </h2>
        <div className="flex justify-center mb-4">
          <Lottie animationData={registerLottieData} loop className="w-40" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={data.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            value={data.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={data.password}
              onChange={handleInputChange}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input
            type="file"
            name="image"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}

          <button className="btn bg-[#54b689] text-white w-full">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have account?{" "}
            <Link to="/login" className="text-[#54b689] hover:underline">
              Login
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

export default SignUp;
