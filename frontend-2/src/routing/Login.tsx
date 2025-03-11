import { Link } from "react-router";
import { Form, useNavigate } from "react-router";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuth } from "../store/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z
    .string()
    .min(6, { message: "Password should be at least of 6 characters." }),
});

type LoginFormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();

  const { storeTokenInLocalStorage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const handleLogin = async (data: FieldValues) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      if (!response.data.success) {
        setError("password", {
          type: "manual",
          message: "Invalid email or password.",
        });
        return;
      }
      const token = response.data.token;
      storeTokenInLocalStorage(token);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="bg-gray-50 flex h-screen items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg p-10 shadow-sm">
        <h1 className="mb-7 text-center text-3xl font-bold">Login</h1>

        <Form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-lg font-medium">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="me@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-lg font-medium"
            >
              Password
            </label>
            <input
              {...register("password")}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-md bg-blue-600 px-7 py-3 text-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </Form>

        <p className="mt-5 text-sm">
          Not a member?{" "}
          <span className="ml-1 text-teal-600 underline">
            <Link to="/signup">Sign up now</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
