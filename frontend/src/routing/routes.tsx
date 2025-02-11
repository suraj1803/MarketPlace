import { createBrowserRouter } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import App from "@/App";

const router = createBrowserRouter([
  { path: "/", element: <App></App> },
  { path: "/login", element: <Login></Login> },
  { path: "/signup", element: <Signup></Signup> },
]);

export default router;
