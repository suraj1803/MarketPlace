import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import useAuthStore, { User as UserProfile } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import axios from "axios";
import useItemStore from "../store/useItemStore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const ProfileUpdate = () => {
  const { user, setUser, token } = useAuthStore();
  const { isLoading, setLoading } = useItemStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.imgUrl || null);

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

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data.data.url; // Return Cloudinary image URL
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    }
    return null;
  };

  const navigate = useNavigate();
  const onSubmit = async (data: UserProfile) => {
    try {
      setLoading(true);
      let imageUrl = user?.imgUrl; // Keep existing image if no new one is uploaded

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const response = await axios.put(
        `/api/users/${user?._id}`,
        { ...data, imgUrl: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.data.success) throw new Error();

      setUser(response.data.user);
      setLoading(false);
      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      handleCancel();
      setLoading(false);
      toast.error("Profile update failed");
    }
  };

  const handleCancel = () => {
    reset({
      _id: user?._id,
      name: user?.name,
      bio: user?.bio,
      email: user?.email,
    });
    setPreview(user?.imgUrl || null);
    setSelectedFile(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${user?._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser, token]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar />
      <div className="bg-gray-50 flex h-screen items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md sm:rounded-lg p-10 sm:shadow-sm">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center">
                {preview ? (
                  <img
                    src={user?.imgUrl || preview}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 text-sm text-gray-600"
                />
              </div>

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
