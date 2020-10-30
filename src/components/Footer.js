import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-bg">
      <div className="container mx-auto pt-8 pb-4 w-8/12 m-auto">
        <div className="pt-4 md:flex md:items-center md:justify-center">
          Copy right {moment().format("YYYY")}
        </div>
        <div className="pt-4 md:flex md:items-center md:justify-center footer-bottom">
          <ul className="">
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <Link to="/" className="underline text-small" href="/disclaimer">
                Home
              </Link>
            </li>
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <Link to="/jobs" className="underline text-small" href="/cookie">
                Jobs
              </Link>
            </li>
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <Link
                to="/about"
                className="underline text-small"
                href="/privacy"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
