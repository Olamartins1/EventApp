import React from "react";
// import { createBrowserRouter } from "react-router-dom";
import { createHashRouter } from "react-router-dom";

import Dashboardlayout from "../components/layout/Dashboardlayout";
import DashboardHome from "../pages/Body/DashboardHome";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Venues from "../pages/Body/Venues";
import Payments from "../pages/Body/Payments";
import Notification from "../pages/Body/Notification";
import ProfileSetting from "../pages/Body/ProfileSetting";
import LandingPageLayout from "../components/layout/LandingPageLayout";
import HomePage from "../pages/Landing/HomePage";
import HallOwnerLogin from "../pages/auth/HallOwner/HallOwnerLogin";
import HallOwnerSignUp from "../pages/auth/HallOwner/HallOwnerSignUp";
import IndividualLayout from "../components/layout/IndividualLayout";
import AllVenues from "../pages/IndividualDashboard/AllVenues";
import Indoor from "../pages/IndividualDashboard/Indoor";
import Outdoor from "../pages/IndividualDashboard/Outdoor";
import Multipurpose from "../pages/IndividualDashboard/Multipurpose";
import SignupIndividual from "../pages/auth/individual/SignupIndividual";
import DetailsPage from "../pages/IndividualDashboard/DetailsPage";
import MyProfile from "./../pages/IndividualDashboard/Profile/MyProfile";
import MyBooking from "./../pages/IndividualDashboard/Profile/MyBooking";
import MyNotification from "./../pages/IndividualDashboard/Profile/MyNotification";
import Setting from "./../pages/IndividualDashboard/Profile/Setting";
import AdminDashboard from "../components/layout/AdminDashboard"
import Overview from "../pages/admin/Overview";
import AdminVenues from "../pages/admin/AdminVenues";

export const Element = createHashRouter([
  {
    path: "/",
    element: <LandingPageLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/dashboardHome",
    element: <Dashboardlayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboardHome/venues",
        element: <Venues />,
      },
      {
        path: "/dashboardHome/payments",
        element: <Payments />,
      },
      {
        path: "/dashboardHome/notifications",
        element: <Notification />,
      },
      {
        path: "/dashboardHome/settings",
        element: <ProfileSetting />,
      },
    ],
  },
  {
    path: "/individual-dashboard",
    element: <IndividualLayout />,
    children: [
      {
        index: true,
        element: <AllVenues />,
      },
      {
        path: "/individual-dashboard/indoor",
        element: <Indoor />,
      },
      {
        path: "/individual-dashboard/outdoor",
        element: <Outdoor />,
      },
      {
        path: "/individual-dashboard/multipurpose",
        element: <Multipurpose />,
      },
      {
        path: "/individual-dashboard/venue/:id",
        element: <DetailsPage />,
      },
    ],
  },
  {
    path: "/individual-dashboard/MyProfile",
    element: <MyProfile />,
    children: [
      {
        path: "/individual-dashboard/MyProfile/bookings",
        element: <MyBooking />,
      },
      {
        path: "/individual-dashboard/MyProfile/notifications",
        element: <MyNotification />,
      },
      {
        path: "/individual-dashboard/MyProfile/settings",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/hall-owner/login",
    element: <HallOwnerLogin />,
  },
  {
    path: "/signup-hallowner",
    element: <HallOwnerSignUp />,
  },
  {
    path: "/signup-individual",
    element: <SignupIndividual />,
  },
  {
  path: "/admin-dashboard",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path:"/admin-dashboard/venues",
        element:<AdminVenues/>
      }
    ]
  }
]);
