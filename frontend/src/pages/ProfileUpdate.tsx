import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import useAuthStore, { User as UserProfile } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import axios from "axios";
import useItemStore from "../store/useItemStore";
import SyncLoader from "react-spinners/SyncLoader";
import toast, { Toaster } from "react-hot-toast";

const ProfileUpdate = () => {
  const { user, setUser, token } = useAuthStore();
  const { isLoading, setLoading } = useItemStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    defaultValues: {
      _id: user?._id,
      name: user?.name,
      bio: user?.bio,
      email: user?.email,
    },
  });

  const onSubmit = async (data: UserProfile) => {
    try {
      console.log("Before: ", data);
      setLoading(true);
      const response = await axios.put(`/api/users/${user?._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.data.success) {
        throw new Error();
      }
      console.log("After: ", data);
      setUser(data);
      setLoading(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      handleCancel();
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      _id: user?._id,
      name: user?.name,
      bio: user?.bio,
      email: user?.email,
    });
  };

  useEffect(() => {
    if (user) {
      reset({
        _id: user._id,
        name: user.name,
        bio: user.bio,
        email: user.email,
      });
    }
  }, [user, reset]); // Reset form values when `user` changes

  return (
    <>
      <div>
        <Toaster></Toaster>
      </div>
      <Navbar />
      <div className="bg-gray-50 flex h-screen items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md sm:rounded-lg p-10 sm:shadow-sm">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <User className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Bio field */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself"
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`w-full px-3 py-2 border bg-gray-100 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="your.email@example.com"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
