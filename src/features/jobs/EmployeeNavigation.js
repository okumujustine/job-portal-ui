import React from "react";

import EmployeeDashboardNavButton from "./EmployeeDashboardNavButton";

export default function EmployeeNavigation() {
  return (
    <div className="mx-8 flex flex-col">
      <EmployeeDashboardNavButton
        to={"/employee-dashboard"}
        title={"Dashboard"}
      />
      <EmployeeDashboardNavButton to={"/employee-profile"} title={"Profile"} />
    </div>
  );
}
