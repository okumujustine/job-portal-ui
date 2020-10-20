import React from "react";
import { Link } from "react-router-dom";

import "./Navigation.css";
import { connect } from "react-redux";

function Navbar({ authState }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const authLinks = (
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg sticky top-0 bg-white z-50">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="nav-bar-font text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
            href="#pablo"
          >
            Job Portal
          </a>
          <button
            className="nav-bar-font cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="nav-bar-font nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                to="/"
              >
                <span className="ml-2">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                to="/jobs"
              >
                <span className="ml-2">Jobs</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                to="/about"
              >
                <span className="ml-2">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs  font-bold leading-snug text-white hover:opacity-75 capitalize"
              >
                <i className="fa fa-user"></i> Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
              >
                <i className="fa fa-lock"></i> Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const loggedInLinks = (
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg sticky top-0 bg-white z-50">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="nav-bar-font text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
            href="#pablo"
          >
            Job Portal
          </a>
          <button
            className="nav-bar-font cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="nav-bar-font nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                to="/"
              >
                <span className="ml-2">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                to="/jobs"
              >
                <span className="ml-2">Jobs</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                to="/about"
              >
                <span className="ml-2">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs  font-bold leading-snug text-white hover:opacity-75 capitalize"
              >
                Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
              >
                Log Out
              </Link>
            </li>
            {!authState.user ? null : authState.user.role === "admin" ? (
              <p>admin</p>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {authState.isAuthenticated === null
        ? null
        : authState.isAuthenticated
        ? loggedInLinks
        : authLinks}
    </>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, null)(Navbar);
