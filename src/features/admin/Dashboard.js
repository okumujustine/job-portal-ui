import React from "react";
import DashboardNavigation from "./DashboardNavigation";

export default function Dashboard() {
  return (
    <div className="flex flex-row">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
        <h5>Dashboard</h5>
      </div>
    </div>
  );
}
