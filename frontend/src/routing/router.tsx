import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import ItemForm from "../pages/ItemForm";
import Signup from "./Signup";
import PrivateRouter from "./PrivateRouter";
import ItemDetails from "../pages/ItemDetails";
import UserProfile from "../pages/UserProfile";
import MyProfile from "../pages/MyProfile";
import ProfileUpdate from "../pages/ProfileUpdate";

const router = createBrowserRouter([
  {
    element: <PrivateRouter />,
    children: [
      { path: "/", element: <App /> },
      { path: "/post", element: <ItemForm /> },
      { path: "/items/:id", element: <ItemDetails /> },
      { path: "/users/me", element: <MyProfile /> },
      { path: "/users/me/update", element: <ProfileUpdate /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/users/:id", element: <UserProfile /> },
  { path: "*", element: <h1>404 Not Found</h1> },
]);

export default router;
