import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSingleSkill = (id) => {
  // fetch skill details
  const { data: skill = {}, isLoading } = useQuery({
    queryKey: ["singleSkill", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-skill/${id}`
      );
      return data;
    },
  });
  return [skill, isLoading];
};

export default useSingleSkill;
