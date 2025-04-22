import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategories = () => {
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      return data;
    },
  });

  return [categories, isLoading, refetch];
};

export default useCategories;
