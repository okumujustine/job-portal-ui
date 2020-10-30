import * as React from "react";

import { dialogStyle, dialogCloseButton } from "../features/auth/AuthStyles";

export default function Dialog({ content, isOpen, isClose, confirm }) {
  const openDialog = (
    <div style={dialogStyle} className={"border-2 border-blue-400"}>
      <button
        className={"bg-blue-300"}
        style={dialogCloseButton}
        onClick={isClose}
      >
        x
      </button>
      <div className={"text-blue-700 text-lg"}>{content}</div>
      <div className="flex">
        <button
          onClick={isClose}
          className="text-white bg-blue-700 font-bold py-2 px-4 rounded-md mr-3"
        >
          Cancel
        </button>
        <button
          onClick={confirm}
          className="text-white bg-red-700 font-bold py-2 px-4 rounded-md ml-3"
        >
          Confirm
        </button>
      </div>
    </div>
  );
  return <React.Fragment>{isOpen ? openDialog : null}</React.Fragment>;
}
