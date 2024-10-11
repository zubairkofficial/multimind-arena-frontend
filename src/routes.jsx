import { createBrowserRouter } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Auth from "./components/Auth";
import Index from "./Pages/Landing/Index";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserDashboard from "./Pages/User/UserDashboard";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ForgotPassword from "./Pages/Auth/ForgotPassword";

// Define routes
export const router = createBrowserRouter([
  // Default Routes
  {
    path: "/",
    element: (
      <Auth isAuth={true}>
        <Index />
      </Auth>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  // Admin Routes
  {
    path: "/admin/",
    children: [
      {
        path: "dashboard",
        element: (
     //     <Auth isAuth={true} isAdmin={true}>
            <AdminDashboard />
         // </Auth>
        ),
      },
    ],
  },

  // User Routes
  {
    path: "/dashboard",
    element: (
       <Auth isAuth={true}>
      <UserDashboard />
       </Auth>
    ),
  },

  // Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);
