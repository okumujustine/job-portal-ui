import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-bg">
      <div className="container mx-auto pt-8 pb-4 w-8/12 m-auto">
        <div className="pt-4 md:flex md:items-center md:justify-center">
          pages
        </div>
        <div className="pt-4 md:flex md:items-center md:justify-center footer-bottom">
          <ul className="">
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <a className="underline text-small" href="/disclaimer">
                Disclaimer
              </a>
            </li>
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <a className="underline text-small" href="/cookie">
                Cookie policy
              </a>
            </li>
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <a className="underline text-small" href="/privacy">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
