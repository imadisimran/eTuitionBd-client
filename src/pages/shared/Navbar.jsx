import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { errorAlert, successAlert } from "../../utilities/alerts";
import SandClock from "../../components/SandClock";
const Navbar = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut, loading } = useAuth();
  const { data: dbUser, isLoading: dbUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const result = await axiosSecure.get(`/user?email=${user?.email}`);
      return result.data;
    },
  });
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-tuitions">Tuitions</NavLink>
      </li>
      <li>
        <NavLink to="/all-tutors">Tutors</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        successAlert("Logout successfully");
      })
      .catch((error) => {
        console.log(error);
        errorAlert();
      });
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="navbar glass mt-5 rounded-3xl shadow-xl px-5 items-center">
        <div className="navbar-start items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="">
            <img className="w-[150px]" src={logo} alt="eTuitionBD logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-5">
          {dbUserLoading || loading ? (
            <SandClock size="50px"></SandClock>
          ) : user ? (
            <div className="flex-none">
              <div className="dropdown dropdown-end"></div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        dbUser?.icon ||
                        dbUser?.photoURL ||
                        "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/dashboard/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          )}
          <Link to="/dashboard/my-posts" className="btn btn-secondary">
            Post Tuition
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
