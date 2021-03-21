import React from "react";

import "./Job.css";
import FilterForm from "../../components/FilterForm";
import Footer from "../../components/Footer";

export default function Jobs() {
  return (
    <>
      <div className="mb-20">
        <FilterForm />
      </div>
      <Footer />
    </>
  );
}
