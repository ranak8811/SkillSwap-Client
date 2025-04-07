import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const loginUsingGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const registerNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = async (updatedData) => {
    // Ensure there is a current user before attempting to update
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, updatedData);
      // Manually update the user state to reflect the changes immediately
      setUser((prevUser) => ({
        ...prevUser, // Keep existing user properties
        ...updatedData, // Overwrite with new display name and photo URL
      }));
      // No need to return the promise here unless specifically needed elsewhere
    } else {
      // Handle the case where there is no logged-in user
      toast.error("No user logged in to update profile.");
      // Optionally throw an error or return a specific value
      throw new Error("No user logged in");
    }
  };

  const loginRegisteredUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    toast.success("User logged out successfully");
    return signOut(auth);
  };

  const authInfo = {
    loginUsingGoogle,
    user,
    setUser,
    logOutUser,
    loading,
    registerNewUser,
    updateUserProfile,
    loginRegisteredUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
