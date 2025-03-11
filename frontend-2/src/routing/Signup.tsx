import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../store/auth";

// Toast type definitions
type ToastType = "error" | "success";
type ToastState = {
  visible: boolean;
  message: string;
  type: ToastType;
};

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

// Custom Toast Component
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-md shadow-lg transition-all duration-300 
      ${type === "error" ? "bg-red-500" : "bg-green-500"} text-white`}
    >
      <div className="mr-3">
        {type === "error" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be at least of 3 characters." }),
  email: z.string().email("Enter a valid email."),
  password: z
    .string()
    .min(6, { message: "Password should be at least of 6 characters." }),
});

type SignUpFormData = z.infer<typeof schema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "error",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SignUpFormData>({ resolver: zodResolver(schema) });

  const showToast = (message: string, type: ToastType = "error"): void => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "error" });
    }, 3000);
  };

  const handleSignUp = async (data: FieldValues): Promise<void> => {
    try {
      const response = await axios.post("/api/auth/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.data.success) {
        setError("email", {
          type: "manual",
          message: response.data.message,
        });
        return;
      }
      console.log("Response from server : ", response.data);
      const token = response.data.token;
      storeTokenInLocalStorage(token);

      showToast("Account created successfully!", "success");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      reset();
      showToast("Network error or server unreachable");
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white w-full max-w-md rounded-lg p-10 shadow-sm ">
          <h1 className="text-3xl font-bold mb-7">Signup</h1>

          <Form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div>
              <label htmlFor="name" className="block text-lg mb-2">
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                placeholder="John Doe"
                className="w-full p-3 border rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg mb-2">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                placeholder="johndoe@gmail.com"
                className="w-full p-3 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                className="w-full p-3 border rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium mt-6"
            >
              SIGN UP
            </button>
          </Form>

          <p className="text-sm mt-5">
            Already have an account?
            <Link to="/login" className="underline text-teal-500 ml-2">
              Login now
            </Link>
          </p>
        </div>
      </div>

      {/* Custom Toast */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ visible: false, message: "", type: "error" })
          }
        />
      )}
    </>
  );
};

export default Signup;
