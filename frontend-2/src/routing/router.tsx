import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import ItemForm from "../pages/ItemForm";
import Signup from "./Signup";
import PrivateRouter from "./PrivateRouter";
import ItemDetails from "../pages/ItemDetails";

const router = createBrowserRouter([
  {
    element: <PrivateRouter />,
    children: [
      { path: "/", element: <App /> },
      { path: "/post", element: <ItemForm /> },
      { path: "/items/:id", element: <ItemDetails /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

export default router;
