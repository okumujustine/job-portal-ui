import React from "react";

import DasboardNavButton from "./DasboardNavButton";

export default function DashboardNavigation() {
  return (
    <div className="mx-8 flex flex-col">
      <p className="pb-5">dashboard nav</p>
      <DasboardNavButton to={"addjob"} title={"Add Job"} />
      <DasboardNavButton to={"applications"} title={"Applications"} />
    </div>
  );
}
