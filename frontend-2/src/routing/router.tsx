import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import ItemForm from "../pages/ItemForm";
import Signup from "./Signup";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/post", element: <ItemForm></ItemForm> },
]);

export default router;
