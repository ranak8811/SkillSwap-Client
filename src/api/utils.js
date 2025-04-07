import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  const image_url = data.data.display_url;

  return image_url;
};

export const saveUserToDatabase = async (user) => {
  // Ensure all expected fields are passed from SignUp.jsx
  await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
    location: user?.location || "User location", // Add location
    bio: user?.bio || "User bio", // Add bio
    timestamp: new Date().toISOString(), // Pass timestamp if needed by backend
  });
};
