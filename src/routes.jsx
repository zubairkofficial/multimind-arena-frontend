import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Auth from "./components/Auth";
import Index from "./Pages/Landing/Index";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ForgotPassword from "./Pages/Auth/ForgotPassword";

// Admin components and layouts
import AdminLayout from "./Pages/Admin/Layout/Index";
import AdminUsers from "./Pages/Admin/ManageUsers/AdminUsers";
import ManageArenas from "./Pages/Admin/Arena/ManageArenas";
import AddArena from "./Pages/Admin/Arena/AddArena";
import RecentActivity from "./Pages/Admin/RecentActivity";
import ManageAiFigures from "./Pages/Admin/AiFigures/ManageAiFigures";

// User components and layout
import UserLayout from "./Pages/User/Layout/Index";
import EditProfile from "./Pages/User/Profile/EditProfile";
import UserDashboard from "./Pages/User/UserDashboard";
import UserAddArena from "./Pages/User/AddArena/AddArena";
import StatusArena from "./Pages/User/AddArena/StatusArena";
import AddAIFigure from "./Pages/Admin/AiFigures/AddAIFigures";
import Home from "./Pages/Admin/Home/Home";
import UserAIFigureGallery from "./Pages/User/AiFigures/UserAiFigureGallery";
import UserAddAiFigure from "./Pages/User/AiFigures/UserAddAIFigures";
import ViewUserProfile from "./Pages/User/Profile/ViewUserProfile";
import ArenaChatPage from "./Pages/User/ArenaChat/ArenaChatPage";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ManageArenaType from "./Pages/Admin/Arena/ArenaType/ManageArenaType";
import ManageTransaction from "./Pages/Admin/Transaction/ManageTransaction";
import AddArenaType from "./Pages/Admin/Arena/ArenaType/AddArenaType";
import AIChatPage from "./Pages/User/Chat/AIChatPage";
import ErrorLogs from "./Pages/Admin/SystemStatus/ErrorLogs";
import HistoryPage from "./Pages/User/History/HistoryPage";
import Shop from "./Pages/User/Payments/Shop";
import ViewAdminProfile from "./Pages/Admin/Profile/ViewAdminProfile";
import ManageBundle from './Pages/Admin/Payments/index'
import UserVerification from "./Pages/Auth/UserVerification";
import ManageBundlePlan from './Pages/Admin/Payments/AdminTokenPlan'
import CreateCard from './Pages/User/Payments/CreateCard'
import Purchase from './Pages/User/Payments/Purchase'
import ExistingCards from './Pages/User/Payments/ExistingCards'
import ManageArenaAccess from './Pages/Admin/Arena/ManageArenaAccess'
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
    path: "/user-verification",
    element: <UserVerification />,
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
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },



  // Admin Routes with Admin Layout
  {
    path: "/admin",
    element: (
      <Auth isAuth={true} isAdmin={true}>
        <AdminLayout />
      </Auth>
    ),
    children: [
      {
        path: "dashboard",
        element:<Home/>,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "manage-arenas",
        element: <ManageArenas />,
      },
      {
        path: "arena-types",
        element: <ManageArenaType />,
      },
      {
          path: "manage-transactions",
          element: <ManageTransaction />,
        },
      {
          path: "arena-access",
          element: <ManageArenaAccess />,
        },
      // {
      //   path: "bundles",
      //   element: <ManageBundle />,
      // },
      // {
      //   path: "add-bundle-plan",
      //   element: <ManageBundlePlan />,
      // },
      {
        path: "update-bundle-plan",
        element: <ManageBundlePlan />,
      },
      {
        path: "add-arena-type",
        element: <AddArenaType />,
      },
      {
        path: "add-arena",
        element: <AddArena />,
      },
    
      {
        path: "recent-activity",
        element: <RecentActivity />,
      },
      {
        path: "system-status",
        element: <ErrorLogs/>,
      },
      {
        path: "manage-ai-figures",
        element: <ManageAiFigures />,
      },
      {
        path: "add-ai-figure",
        element: <AddAIFigure />,
      },
      {
        path: "view-profile",
        element: <ViewAdminProfile />,
      },
    ],
  },

  // User Routes with User Layout
  {
    path: "/",
    element: (
      <Auth isAuth={true}>
        <UserLayout />
      </Auth>
    ),
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "view-profile",
        element: <ViewUserProfile />,
      },
      {
        path: "chat/:figureId",
        element: <AIChatPage />,
      },
      {
        path:"arena-chat/:id",
        element: <ArenaChatPage/>},
      {
        path: "add-arena",
        element: <UserAddArena />,
      },
      {
        path: "ai-figure-gallery",
        element: <UserAIFigureGallery />,
      },
      {
        path: "request-arena",
        element: <StatusArena />,
      },
      {
        path: "/add-ai-figure",
        element: <UserAddAiFigure />,
      },
      {
        path: "history/:id",
        element: <HistoryPage />,
      },
      // {
      //   path: "/shop",
      //   element: <Shop/>,
      // },
      {
        path: "/purchase",
        element: <Purchase/>,
      },
      {
        path: "/create-card",
        element: <CreateCard/>,
      },
      {
        path: "/existing-card",
        element: <ExistingCards/>,
      },
      
    ],
  },

  // Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);
