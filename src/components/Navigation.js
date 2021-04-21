import * as React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Navigation.css";
import { logoutUser } from "../redux/actions/auth/AuthAction";
import Dialog from "./Dialog";

function Navbar({ authState, logoutUser }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");

  const onLogoutUser = () => {
    setDialogMessage("Are you sure you want to logout !?");
    setOpenDialog(true);
  };

  const onConfirm = () => {
    setOpenDialog(false);
    logoutUser();
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink
          to="/signup"
          activeClassName="main-nav-active-class-2"
          className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs  font-bold leading-snug text-white hover:opacity-75 capitalize"
        >
          <i className="fa fa-user"></i> Sign Up
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/login"
          activeClassName="main-nav-active-class-2"
          className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
        >
          <i className="fa fa-lock"></i> Log In
        </NavLink>
      </li>
    </>
  );

  const loggedInLinks = (
    <>
      {!authState.user ? null : authState.user.role === "employer" ||
        authState.user.role === "admin" ? (
        <li className="nav-item">
          <NavLink
            activeClassName="main-nav-active-class-2"
            to="/admin-dashboard"
            isActive={(match, location) => {
              let pathStrings = location.pathname.split("/");
              if (match) {
                return true;
              } else if (pathStrings[1] === "employer-profile") {
                return true;
              } else if (pathStrings[1] === "admin-job-applications-detail") {
                return true;
              } else if (pathStrings[1] === "admin-addjob") {
                return true;
              } else if (pathStrings[1] === "admin-job-applications") {
                return true;
              } else {
                return false;
              }
            }}
            className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li className="nav-item">
          <NavLink
            activeClassName="main-nav-active-class-2"
            to="/employee-dashboard"
            isActive={(match, location) => {
              let pathStrings = location.pathname.split("/");
              if (match) {
                return true;
              } else if (pathStrings[1] === "employee-profile") {
                return true;
              } else {
                return false;
              }
            }}
            className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs  font-bold leading-snug text-white hover:opacity-75 capitalize"
          >
            Dasboard
          </NavLink>
        </li>
      )}
      <li className="nav-item">
        <button
          onClick={onLogoutUser}
          className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
        >
          Log Out
        </button>
      </li>
    </>
  );

  return (
    <>
      <Dialog
        content={dialogMessage}
        isOpen={openDialog}
        isClose={closeDialog}
        confirm={onConfirm}
      />
      <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg sticky top-0 bg-white z-50 shadow-md">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="nav-bar-font text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap  text-white"
              href="#pablo"
            >
              JobsUg{" "}
              {authState?.isAuthenticated ? (
                <span className="font-bold underline text-jobBlue-100">
                  (Hi {authState?.user?.first_name})
                </span>
              ) : null}
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
                <NavLink
                  activeClassName="main-nav-active-class"
                  className="mx-2 nav-bar-font nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                  to="/home"
                >
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="main-nav-active-class"
                  className="mx-2 nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                  to="/jobs"
                >
                  <span>Jobs</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="main-nav-active-class"
                  className="mx-2 nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                  to="/about"
                >
                  <span>About</span>
                </NavLink>
              </li>
              {authState.isAuthenticated ? loggedInLinks : authLinks}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
