import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import LoadingPage from "../LoadingPage/LoadingPage";

const TrendingSkills = () => {
  const { data: trending = [], isLoading } = useQuery({
    queryKey: ["trendingSkills"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/trending-skills`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="px-4 md:px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-textt">
        🔥 Trending Skill Categories 🔥
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={trending} layout="vertical" margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="category" width={150} />
          <Tooltip />
          <Bar dataKey="count" fill="#54b689" radius={[0, 10, 10, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendingSkills;
