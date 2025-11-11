import { createHashRouter } from "react-router-dom";
import Dashboardlayout from "../components/layout/Dashboardlayout";
import DashboardHome from "../pages/Body/DashboardHome";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
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
import Loading from "../components/static/Loading/Loading";
import AdminDashboard from "../components/layout/AdminDashboard";
import Overview from "../pages/admin/Overview";
import AdminVenues from "../pages/admin/AdminVenues";
import Protect from "./Protect";
import IndividualPayment from "../pages/IndividualDashboard/IndividualPayment";
import SuccessfulPayment from "../components/SuccessfulPayment";
import Invoice from "../pages/IndividualDashboard/Invoice";


export const Element = createHashRouter([
  {
    path: "/",
    element: <LandingPageLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/dashboardHome",
    element: (
      <Protect>
        <Dashboardlayout />
      </Protect>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "venues",
        element: <Venues />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <ProfileSetting />,
      },
    ],
  },
  {
    path: "/individual-dashboard",

    element: (
      <Protect>
        <IndividualLayout />
      </Protect>
    ),
    children: [
      {
        index: true,
        element: <AllVenues />,
      },
      {
        path: "indoor",
        element: <Indoor />,
      },
      {
        path: "outdoor",
        element: <Outdoor />,
      },
      {
        path: "multipurpose",
        element: <Multipurpose />,
      },
      {
        path: "venue/:id",
        element: <DetailsPage />,
      },
    ],
  },
  {
    path: "/individual-dashboard/MyProfile",
    element: (
      <Protect>
        <MyProfile />
      </Protect>
    ),
    children: [
      {
        path: "bookings",
        element: <MyBooking />,
      },
      {
        path: "notifications",
        element: <MyNotification />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Invoice/:id",
    element: <Invoice />,
  },
  {
    path: "/payment-success/:reference",
    element: <SuccessfulPayment />,
  },
  {
    path: "/IndividualPayment/:id",
    element: <IndividualPayment />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
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
    path: "/test-loading",
    element: <Loading />,
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
        path: "venues",
        element: <AdminVenues />,
      },
    ],
  },
]);
