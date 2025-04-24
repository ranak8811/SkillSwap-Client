import React, { useEffect, useState } from "react";
import axios from "axios";

const TrendingSkills = () => {
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/trending-skills`
        );
        setTrendingSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending skills:", error);
        setLoading(false);
      }
    };

    fetchTrendingSkills();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Trending Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingSkills.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">
              {category._id}
            </h2>
            <p className="text-gray-600">
              Total Requests: <span className="font-bold">{category.totalRequests}</span>
            </p>
            <p className="text-gray-600">
              Total Offers: <span className="font-bold">{category.totalOffers}</span>
            </p>
            <p className="text-gray-600">
              Total Skills: <span className="font-bold">{category.totalSkills}</span>
            </p>
            <ul className="mt-4">
              {category.skills.slice(0, 3).map((skill) => (
                <li
                  key={skill._id}
                  className="text-sm text-gray-700 border-b border-gray-200 pb-2 mb-2"
                >
                  {skill.title} ({skill.type})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSkills;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import LoadingPage from "../LoadingPage/LoadingPage";
// import useTitle from "../../../public/PageTitle/title";

// const TrendingSkills = () => {
//   useTitle("Trending Skills");
//   const { data: trending = [], isLoading } = useQuery({
//     queryKey: ["trendingSkills"],
//     queryFn: async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/trending-skills`
//       );
//       return data;
//     },
//   });

//   if (isLoading) return <LoadingPage />;

//   return (
//     <div className="px-4 md:px-12 py-8">
//       <h2 className="text-3xl font-bold text-center mb-8 text-textt">
//         🔥 Trending Skill Categories 🔥
//       </h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={trending} layout="vertical" margin={{ left: 40 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis type="number" allowDecimals={false} />
//           <YAxis type="category" dataKey="category" width={150} />
//           <Tooltip />
//           <Bar dataKey="count" fill="#54b689" radius={[0, 10, 10, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TrendingSkills;
