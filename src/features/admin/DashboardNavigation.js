import React from "react";
import { NavLink } from "react-router-dom";

import DasboardNavButton from "./DasboardNavButton";

export default function DashboardNavigation() {
  return (
    <div className="mx-8 flex flex-col">
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
  );
}
