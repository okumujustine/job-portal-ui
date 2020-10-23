import * as React from "react";

import { dialogStyle, dialogCloseButton } from "./AuthStyles";
import { Link } from "react-router-dom";
import { isError } from "lodash";

export default function AuthDialog({
  content,
  isLoginButton,
  isOpen,
  isClose,
  isError,
}) {
  const openDialog = (
    <div
      style={dialogStyle}
      className={
        isError ? "border-2 border-red-400" : "border-2 border-blue-400"
      }
    >
      <button
        className={isError ? "bg-red-300" : "bg-blue-300"}
        style={dialogCloseButton}
        onClick={isClose}
      >
        x
      </button>
      <div
        className={isError ? "text-red-700 text-lg" : "text-blue-700 text-lg"}
      >
        {content}
      </div>
      {isLoginButton && (
        <Link to="/login" className="text-blue-700 underline">
          go to login
        </Link>
      )}
    </div>
  );
  return <React.Fragment>{isOpen ? openDialog : null}</React.Fragment>;
}
