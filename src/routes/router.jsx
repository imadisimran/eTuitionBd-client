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
import TuitionDetails from "../pages/Home/TuitionDetails";
import PendingTutors from "../pages/Dashboard/PendingTutors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "tuition/:id", element: <TuitionDetails></TuitionDetails> },
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
    ],
  },
]);

export default router;
