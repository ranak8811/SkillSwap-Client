import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import errorLottieFile from "../../assets/lottie/error.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <Lottie animationData={errorLottieFile} loop />

      <h1 className="text-5xl font-bold  my-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={goBack}
        className="border border-green-500 
            text-green-500 
            hover:bg-green-500
            hover:text-white
            transition 
            duration-300
            rounded-lg 
            py-3 
            px-6"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
