import { createBrowserRouter } from "react-router";
import Login from "./Login";
import Signup from "./Signup";

const router = createBrowserRouter([
  { path: "/", element: <Login></Login> },
  { path: "/login", element: <Login></Login> },
  { path: "/signup", element: <Signup></Signup> },
]);

export default router;
