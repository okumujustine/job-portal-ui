import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

import "./Navigation.css";
import { logoutUser } from "../redux/actions/auth/AuthAction";
import Dialog from "./Dialog";

function Navbar({ authState, logoutUser }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");

  const alert = useAlert();

  React.useEffect(() => {
    if (authState && authState.logout && authState.logout === "sucess") {
      alert.success("successfully loggedout!");
      return;
    }

    if (authState && authState.logout && authState.logout === "failed") {
      alert.error("failed, try again later!");
      return;
    }
  }, [authState]);

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
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg sticky top-0 bg-white z-50 shadow-md">
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

  const nullLinks = (
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg sticky top-0 bg-white z-50 shadow-md">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="animate-pulse  w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="nav-bar-font text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase bg-text-400"
            href="#pablo"
          >
            Job Portal
          </a>
        </div>
      </div>
    </nav>
  );
  const loggedInLinks = (
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg sticky top-0 bg-white z-50 shadow-md">
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
            {!authState.user ? null : authState.user.role === "employer" ||
              authState.user.role === "admin" ? (
              <li className="nav-item">
                <Link
                  to="/admin-dashboard"
                  className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs capitalize font-bold leading-snug text-white hover:opacity-75"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/employee-dashboard"
                  className="navigation-button-link nav-bar-font px-3 py-2 flex items-center text-xs  font-bold leading-snug text-white hover:opacity-75 capitalize"
                >
                  Dasboard
                </Link>
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
          </ul>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <Dialog
        content={dialogMessage}
        isOpen={openDialog}
        isClose={closeDialog}
        confirm={onConfirm}
      />
      {authState.isAuthenticated === null
        ? nullLinks
        : authState.isAuthenticated
        ? loggedInLinks
        : authLinks}
    </>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
