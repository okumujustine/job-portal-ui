import React from "react";
import { NavLink } from "react-router-dom";

export default function EmployeeDasboardNavButton({ to, title }) {
  return (
    <NavLink
      to={to}
      activeClassName="bg-jobBlue-100 dasboard-links-active-class-ext"
      className="p-2 text-jobBlue-100 text-center mb-5 font-bold bg-white border border-jobBlue-100"
    >
      {title}
    </NavLink>
  );
}
