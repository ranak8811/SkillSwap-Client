import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { saveUserToDatabase } from "../../api/utils";

const SocialLogin = () => {
  const { loginUsingGoogle, setUser } = useAuth();

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const data = await loginUsingGoogle();
      // save user information in db if user is new
      await saveUserToDatabase(data?.user);
      setUser(data?.user);
      toast.success("Signup using google Successful");
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="divider"></div>
      <div>
        {/* <AwesomeButton onPress={handleGoogleSignIn} type="primary">
          <FaGoogle />
          {"-"} Login using Google
        </AwesomeButton> */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center mt-2"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
