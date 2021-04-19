import React from "react";
import Footer from "../../components/Footer";

export default function AboutUs() {
  return (
    <React.Fragment>
      <div className="min-h-screen">
        <div className="flex flex-col justify-center items-center py-16">
          <h1 className="font-bold text-2xl">About us</h1>
          <div>
            <p className="text-1xl py-4">
              JobsUg is the most trusted job board, connecting the world's{" "}
              <br />
              brightest minds with resume database loaded with talents.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
