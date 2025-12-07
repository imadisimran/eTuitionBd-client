import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/shared/Dashboard/DashboardHome";
import DashboardProfile from "../pages/shared/Dashboard/DashboardProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [{ index: true, element: <Home></Home> }],
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
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {index:true,element:<DashboardHome></DashboardHome>},
      {path:'profile',element:<DashboardProfile></DashboardProfile>}
    ]
  }
]);

export default router;
