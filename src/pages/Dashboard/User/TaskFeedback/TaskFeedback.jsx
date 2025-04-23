import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useTitle from "../../../../../public/PageTitle/title";

const TaskFeedback = () => {
  useTitle("Task Feedback");
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: "", comment: "" });
  const [reportReason, setReportReason] = useState("");

  const { data: feedbackSkills = [], isLoading } = useQuery({
    queryKey: ["feedbackSkills"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/accepted-exchanges/${user?.email}`
      );
      return data;
    },
  });

  const { mutate: submitReview } = useMutation({
    mutationFn: async (review) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/review`,
        review
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully");
      setReviewData({ rating: "", comment: "" });
      setSelectedSkill(null);
      queryClient.invalidateQueries(["feedbackSkills"]);
    },
  });

  const { mutate: submitReport } = useMutation({
    mutationFn: async (report) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/report`,
        report
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Report submitted successfully");
      setReportReason("");
      setSelectedSkill(null);
      queryClient.invalidateQueries(["feedbackSkills"]);
    },
  });

  const filteredSkills = feedbackSkills.filter((skill) =>
    skill.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredSkills.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task Feedback</h2>

      <input
        type="text"
        placeholder="Search by title"
        className="input input-bordered w-full max-w-md mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>My Skill</th>
              <th>Other Skill</th>
              <th>Review</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSkills.map((skill) => {
              const mySkillId =
                user?.email === skill.creatorEmail
                  ? skill.creatorSkillId
                  : skill.applicationSkillId;
              const otherSkillId =
                user?.email === skill.creatorEmail
                  ? skill.applicationSkillId
                  : skill.creatorSkillId;
              // const isReviewer = user?.email === skill.creatorEmail;
              return (
                <tr key={skill._id}>
                  <td>{skill.title}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/skillDetails/${mySkillId}`)}
                    >
                      My Skill
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => navigate(`/skillDetails/${otherSkillId}`)}
                    >
                      Other Skill
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        setSelectedSkill({
                          skillId: otherSkillId,
                          type: "review",
                        })
                      }
                      disabled={skill.reviewed || skill.reported}
                    >
                      Review
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() =>
                        setSelectedSkill({
                          skillId: otherSkillId,
                          type: "report",
                        })
                      }
                      disabled={skill.reviewed || skill.reported}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              page === currentPage ? "btn-active" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* DaisyUI Modal */}
      {selectedSkill?.type === "review" && (
        <dialog id="review_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Submit Review</h3>
            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered w-full mb-2"
              placeholder="Rating (1-5)"
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Write your comment"
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
            ></textarea>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setSelectedSkill(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() =>
                    submitReview({
                      reviewerEmail: user.email,
                      skillId: selectedSkill.skillId,
                      rating: reviewData.rating,
                      comment: reviewData.comment,
                    })
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {selectedSkill?.type === "report" && (
        <dialog id="report_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Report Skill</h3>
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Reason for reporting"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setSelectedSkill(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn-error ml-2"
                  onClick={() =>
                    submitReport({
                      reporterEmail: user.email,
                      skillId: selectedSkill.skillId,
                      reason: reportReason,
                    })
                  }
                >
                  Report
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TaskFeedback;
