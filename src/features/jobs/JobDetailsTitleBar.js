import React from "react";
import { Link } from "react-router-dom";

export default function JobDetailsTitleBar() {
  return (
    <div className="title-bar flex items-center justify-between">
      <Link
        to="/jobs"
        className="text-lg bg-white py-1 px-2 rounded-full border-2 border-green-700"
      >
        <i className="fas fa-angle-left"></i> Browse More Jobs
      </Link>
      <h1>Job Details</h1>
    </div>
  );
}
