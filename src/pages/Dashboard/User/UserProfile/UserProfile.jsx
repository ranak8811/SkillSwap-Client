import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import { format } from "date-fns";
import { Dialog } from "@headlessui/react";

const UserProfile = () => {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({ bio: "", location: "" });

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`,
        updates
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.email]);
      setIsOpen(false);
    },
  });

  if (loading || isLoading) return <LoadingPage />;
  const { name, image, email, location, bio, timestamp, role } = userDetails;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(editData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg space-y-6">
      <div className="text-center">
        <img
          src={image}
          alt="User avatar"
          className="w-24 h-24 mx-auto rounded-full object-cover"
        />
        <h2 className="text-xl font-semibold mt-4">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="text-sm space-y-2 text-gray-600">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Location:</strong> {location || "Not set"}
        </p>
        <p>
          <strong>Bio:</strong> {bio || "Not set"}
        </p>
        <p>
          <strong>Joined:</strong> {format(new Date(timestamp), "PPpp")}
        </p>
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            setIsOpen(true);
            setEditData({ bio: bio || "", location: location || "" });
          }}
          className="btn btn-primary bg-[#54b689] text-white"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal for updating bio and location */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6 space-y-4">
            <Dialog.Title className="text-lg font-semibold">
              Update Profile
            </Dialog.Title>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-[#54b689] text-white">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserProfile;
