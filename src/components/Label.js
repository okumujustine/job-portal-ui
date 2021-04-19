import React from "react";

export default function Label({ label }) {
  return (
    <div className="mt-4 underline">
      <label>{label}</label>
    </div>
  );
}
