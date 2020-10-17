import React from "react";

import "./Job.css";
import FilterForm from "../../components/FilterForm";
import Footer from "../../components/Footer";
import JobTitleBar from "./JobTitleBar";

export default function Jobs() {
  return (
    <>
      <JobTitleBar />
      <div className="mb-16">
        <FilterForm />
      </div>
      <Footer />
    </>
  );
}
