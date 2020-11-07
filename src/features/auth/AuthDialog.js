import * as React from "react";

import { dialogStyle, dialogCloseButton } from "./AuthStyles";
import { Link } from "react-router-dom";

export default function AuthDialog({
  content,
  isLoginButton,
  isOpen,
  isClose,
  isError,
  isEmailInput,
  onSubmitEmail,
  isEmailLoading,
}) {
  const [emailInputState, setEmailInputState] = React.useState("");

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
      {isEmailInput ? (
        //okumujustine01@gmail.com
        // Zila0781459239
        <React.Fragment>
          <form className="flex flex-col" onSubmit={onSubmitEmail}>
            <input
              type="email"
              className="border-2 border-black mb-2 mt-2 py-1 px-4"
              placeholder="enter email address here"
              value={emailInputState}
              onChange={(e) => setEmailInputState(e.target.value)}
            />
            <button type="submit" className="p-2 bg-black text-white">
              {isEmailLoading
                ? "sending code, wait..."
                : "send verification code"}
            </button>
          </form>
        </React.Fragment>
      ) : null}
    </div>
  );
  return <React.Fragment>{isOpen ? openDialog : null}</React.Fragment>;
}
