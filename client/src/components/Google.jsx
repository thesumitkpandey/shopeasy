import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { signIn } from "../redux/authSlice";
const GoogleSignIn = () => {
  const dispatch = useDispatch((state) => state.auth);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const response = await axiosInstance.post(
          "/api/users/auth/googleauth",
          {
            name: result.user.displayName,
            email: result.user.email,
            phone: result.user.phoneNumber,
          }
        );
        toast.success(`Signed In as ${response.data.userInfo.name}`);
        dispatch(signIn({ ...response.data }));
        navigate("/success");
      }
    } catch (error) {
      toast.error("Please try again after some time");
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-300 py-4 text-xl rounded-xl font-bold hover:bg-gray-100 transition shadow-sm"
    >
      <FcGoogle className="text-3xl" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
