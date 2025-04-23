import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import SkillCard from "../../components/Home/SkillCard/SkillCard";
import useAuth from "../../hooks/useAuth";
import { GoSearch } from "react-icons/go";
import useTitle from "../../../public/PageTitle/title";

const Home = () => {
  useTitle("Home");
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // debounced value
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sortByDate, setSortByDate] = useState(false);

  // Debounce search input (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(0); // reset to first page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data = {}, isLoading } = useQuery({
    queryKey: [
      "skills",
      debouncedSearch,
      currentPage,
      itemsPerPage,
      sortByDate,
    ],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/get-skills?searchParams=${debouncedSearch}&page=${currentPage}&size=${itemsPerPage}&sortByDate=${sortByDate}`
      );
      return data;
    },
  });

  const skills = data.skills || [];
  const skillsCount = data.count || 0;
  const numberOfPages = Math.ceil(skillsCount / itemsPerPage);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="">
      <header>
        <Banner />
      </header>
      <section className="px-4 md:px-8 lg:px-16">
        {/* Search Section Heading */}
        <h2 className="text-2xl font-semibold text-center my-8">
          Explore Skills
        </h2>

        {/* Search Input */}
        <div className="max-w-[600px] mx-auto relative mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search skills by category..."
            className="input input-bordered w-full pl-12 text-sm"
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 left-4 text-xl text-gray-400">
            <GoSearch />
          </span>
        </div>

        {/* Sort and Pagination Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button
            onClick={() => {
              setSortByDate(!sortByDate);
              setCurrentPage(0);
            }}
            className="btn btn-outline bg-[#54b689] text-white btn-sm text-sm rounded-full px-6"
          >
            {sortByDate ? "Clear Sort" : "Sort by Date"}
          </button>

          <select
            className="select select-bordered w-full md:w-40"
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(0);
            }}
          >
            {[3, 5, 8, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>

        {/* Skill Cards Section */}
        <h3 className="text-lg font-medium mb-4">
          Showing {skills.length} of {skillsCount} skills
        </h3>

        {skills.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} user={user} />
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 font-medium mt-10">
            No skills found for your search.
          </p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          {[...Array(numberOfPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`btn btn-sm ${
                currentPage === num ? "bg-[#54b689] text-white" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
