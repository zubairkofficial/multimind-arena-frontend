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
import EditProfile from "./Pages/User/Profile/EditProfile";
import AdminUsers from './Pages/Admin/AdminUsers';
// Define routes
export const router = createBrowserRouter([
  // Default Routes
  {
    path: "/",
    element: <Index />,
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
    path: "/admin",
    element: (
      <Auth isAuth={true} isAdmin={true}>
        <AdminDashboard />  
      </Auth>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />, // Route for /admin/dashboard
      },
      {
        path: "users",
        element: <AdminUsers />, // Route for /admin/users
      },
      // You can add more admin routes like this
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
  {
    path: "/profile",
    element: (
      <Auth isAuth={true}>
        <EditProfile />
      </Auth>
    ),
  },

  // Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);
