import React from "react";
import Banner from "../../components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import SkillCard from "../../components/Home/SkillCard/SkillCard";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/get-skills`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <header>
        <Banner />
      </header>
      <div>this is home</div>
      <div>
        {skills.map((skill) => (
          <SkillCard key={skill._id} skill={skill} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
