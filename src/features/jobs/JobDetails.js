import React from "react";
import JobDetailsTitleBar from "./JobDetailsTitleBar";
import { useParams, useLocation } from "react-router-dom";

export default function JobDetails({ location }) {
  let { slug } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <JobDetailsTitleBar />
      <p>job {slug}</p>
      <h1>{state.title}</h1>
    </div>
  );
}
