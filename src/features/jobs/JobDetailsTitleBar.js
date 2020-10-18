import React from "react";
import { Link } from "react-router-dom";

export default function JobDetailsTitleBar({ job }) {
  return (
    <div className="title-bar flex items-center justify-between">
      <Link
        to="/jobs"
        className="lg:text-lg md:text-lg xl:text-lg bg-white lg:py-1 lg:px-2 px-1 rounded-md text-sm lg:rounded-full md:rounded-full xl:rounded-full border-2 border-green-700"
      >
        <i className="fas fa-angle-left"></i> Jobs
      </Link>
      <h5 className="text-sm md:text-lg xl:text-lg lg:text-lg">{job.title}</h5>
    </div>
  );
}
