import React from "react";

import Footer from "../../components/Footer";
import ContactForm from "../contactus/contact-form";

export default function AboutUs() {
  return (
    <React.Fragment>
      <div className="min-h-screen mt-4">
        <div className="flex flex-col lg:w-full justify-center items-center py-8 px-4 lg:py-16">
          <h1 className="font-bold text-2xl">About us</h1>
          <div>
            <p className="text-1xl text-center py-4 lg:py-4">
              JobsUg is the most trusted job board, connecting the world's{" "}
              <br />
              brightest minds with resume database loaded with talents.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
