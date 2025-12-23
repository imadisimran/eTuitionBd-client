import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import DashboardProfile from "../pages/Dashboard/DashboardProfile";
import MyTuitions from "../pages/Dashboard/MyTuitions";
import PrivateRoute from "./PrivateRoute";
import PendingTuitions from "../pages/Dashboard/PendingTuitions";
import AdminRoute from "./AdminRoute";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";
import PendingTutors from "../pages/Dashboard/PendingTutors";
import TutorDetails from "../pages/TutorDetails/TutorDetails";
import TutorRoute from "./TutorRoute";
import MyApplications from "../pages/Dashboard/MyApplications";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import MyPosts from "../pages/Dashboard/MyPosts";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import AllTuitions from "../pages/AllTuitions/AllTuitions";
import UserManagement from "../pages/Dashboard/UserManagement";
import AllTutors from "../pages/AllTutors/AllTutors";
import NotFound from "../pages/NotFound/NotFound";
import PaymentCancel from "../pages/Dashboard/PaymentCancel";
import StudentRoute from "./StudentRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "tuition/:id", element: <TuitionDetails></TuitionDetails> },
      { path: "tutor/:id", element: <TutorDetails></TutorDetails> },
      { path: "all-tuitions", element: <AllTuitions></AllTuitions> },
      { path: "all-tutors", element: <AllTutors></AllTutors> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome></DashboardHome> },
      { path: "profile", element: <DashboardProfile></DashboardProfile> },
      { path: "my-tuitions", element: <MyTuitions></MyTuitions> },
      {
        path: "pending-tuitions",
        element: (
          <AdminRoute>
            <PendingTuitions></PendingTuitions>
          </AdminRoute>
        ),
      },
      {
        path: "pending-tutors",
        element: (
          <AdminRoute>
            <PendingTutors></PendingTutors>
          </AdminRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <TutorRoute>
            <MyApplications></MyApplications>
          </TutorRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "my-posts",
        element: (
          <StudentRoute>
            <MyPosts></MyPosts>
          </StudentRoute>
        ),
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "/*", element: <NotFound></NotFound> },
]);

export default router;
