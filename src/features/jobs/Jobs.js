import React from "react";

import "./Job.css";
import FilterForm from "../../components/FilterForm";
import Footer from "../../components/Footer";

export default function Jobs() {
  return (
    <>
      <div className="title-bar">
        <h1>cool</h1>
      </div>
      <div className="mb-16">
        <FilterForm />
      </div>
      <Footer />
    </>
  );
}
