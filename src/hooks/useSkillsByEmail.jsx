import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSkillsByEmail = (email) => {
  // fetch all skill for a specific user by email
  const { data: skills = {}, isLoading } = useQuery({
    queryKey: ["skillByEmail"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-skills/${email}`
      );
      return data;
    },
  });
  return [skills, isLoading];
};

export default useSkillsByEmail;
