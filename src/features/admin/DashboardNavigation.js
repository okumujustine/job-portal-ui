import React from "react";

import DasboardNavButton from "./DasboardNavButton";

export default function DashboardNavigation() {
  return (
    <div className="mx-8 flex flex-col">
      <DasboardNavButton to={"/admin-dashboard"} title={"Dashboard"} />
      <DasboardNavButton to={"/admin-addjob"} title={"Add Job"} />
      <DasboardNavButton
        to={"/admin-job-applications"}
        title={"Applications"}
      />
      <DasboardNavButton to={"/employer-profile"} title={"Profile"} />
    </div>
  );
}
