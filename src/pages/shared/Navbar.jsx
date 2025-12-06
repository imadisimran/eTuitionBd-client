import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
const Navbar = () => {
    const links = <>
        <li>
            <NavLink className='active:bg-neutral' to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/tuitions'>Tuitions</NavLink>
        </li>
        <li>
            <NavLink to='/tutors'>Tutors</NavLink>
        </li>
    </>
  return (
    <div className="navbar bg-base-100 glass mt-5 rounded-2xl px-5">
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
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
