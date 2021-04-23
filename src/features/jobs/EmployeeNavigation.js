import React from "react";
import { NavLink } from "react-router-dom";

import EmployeeDashboardNavButton from "./EmployeeDashboardNavButton";

export default function EmployeeNavigation() {
  return (
    <>
      <div className="mx-3 lg:hidden flex flex-row flex-wrap mb-3">
        <NavLink
          to="/employee-dashboard"
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="border border-jobBlue-100 rounded-md px-2 mr-2 mt-1"
        >
          Dasboard
        </NavLink>
        <NavLink
          to="/employee-profile"
          activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
          className="border border-jobBlue-100 rounded-md px-2 mr-2 mt-1"
        >
          Profile
        </NavLink>
      </div>
      <div className="mx-8 flex flex-col hidden lg:block">
        <EmployeeDashboardNavButton
          to={"/employee-dashboard"}
          title={"Dashboard"}
        />
        <EmployeeDashboardNavButton
          to={"/employee-profile"}
          title={"Profile"}
        />
      </div>
    </>
  );
}
