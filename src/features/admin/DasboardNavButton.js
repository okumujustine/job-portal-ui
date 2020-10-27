import React from "react";
import { Link } from "react-router-dom";

export default function DasboardNavButton({ to, title }) {
  return (
    <Link
      to={to}
      className="p-2 text-white text-center mb-5 font-bold bg-jobBlue-800"
    >
      {title}
    </Link>
  );
}
