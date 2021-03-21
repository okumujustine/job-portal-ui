import React from "react";
import moment from "moment";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-bg">
      <div className="container mx-auto py-4 pb-4 w-8/12 m-auto">
        <div className="md:flex md:items-center md:justify-center">
          Copy right {moment().format("YYYY")}
        </div>
        <h5 className="text-center">
          Creator:<i>okumu justine</i>
        </h5>
      </div>
    </footer>
  );
}
