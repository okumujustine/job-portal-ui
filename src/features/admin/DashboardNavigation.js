import React from "react";
import { NavLink } from "react-router-dom";

import DasboardNavButton from "./DasboardNavButton";

export default function DashboardNavigation() {
  return (
    <>
      <div className=" mx-3 lg:hidden flex flex-row flex-wrap mb-3">
        <NavLink
          to="/admin-dashboard"
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="border border-jobBlue-100 rounded-md px-2 mr-2 mt-1"
        >
          Dasboard
        </NavLink>
        <NavLink
          to="/admin-addjob"
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="border border-jobBlue-100 rounded-md px-2 mr-2 mt-1"
        >
          {" "}
          Add Job
        </NavLink>
        <NavLink
          to="/admin-job-applications"
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="border border-jobBlue-100 rounded-md px-2 mr-2 mt-1"
        >
          Application
        </NavLink>
        <NavLink
          to="/employer-profile"
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="border border-jobBlue-100 rounded-md px-2 mr-2 mt-1"
        >
          Profile
        </NavLink>
      </div>
      <div className="mx-8 lg:flex hidden lg:block lg:flex-col">
        <DasboardNavButton to={"/admin-dashboard"} title={"Dashboard"} />
        <DasboardNavButton to={"/admin-addjob"} title={"Add Job"} />
        <NavLink
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="p-2 text-jobBlue-100 text-center mb-5 font-bold bg-white border border-jobBlue-100"
          to="/admin-job-applications"
          isActive={(match, location) => {
            let pathStrings = location.pathname.split("/");
            if (match) {
              return true;
            } else if (pathStrings[1] === "admin-job-applications-detail") {
              return true;
            } else {
              return false;
            }
          }}
        >
          Applications
        </NavLink>
        <DasboardNavButton to={"/employer-profile"} title={"Profile"} />
      </div>
    </>
  );
}
