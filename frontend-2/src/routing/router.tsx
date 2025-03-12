import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import ItemForm from "../pages/ItemForm";
import Signup from "./Signup";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    element: <PrivateRouter />,
    children: [
      { path: "/", element: <App /> },
      { path: "/post", element: <ItemForm /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

export default router;
