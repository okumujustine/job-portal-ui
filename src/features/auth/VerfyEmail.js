import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";

import AuthDialog from "./AuthDialog";

export default function VerfyEmail() {
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [isLoginButton, setIsLoginButton] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");

  let { email, token } = useParams();

  const alert = useAlert();

  const verifyToken = () => {
    if (!email) {
      alert.error("use a valid link with email address!");
      return;
    }
    if (!token) {
      alert.error("use a valid link with valid token!");
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/auth/email-verify/?email=${email}&token=${token}`
      )
      .then((res) => {
        setIsLoginButton(true);
        setOpenAuthDialog(true);
        setDialogMessage(res.data.email);
      })
      .catch((error) => {
        setIsError(true);
        setDialogMessage(error.response.data.error);
        setOpenAuthDialog(true);
      });
  };

  const closeAuthDialog = () => {
    setOpenAuthDialog(false);
  };

  return (
    <div>
      <h5>verify email</h5>
      <AuthDialog
        isOpen={openAuthDialog}
        isClose={closeAuthDialog}
        isError={isError}
        content={dialogMessage}
        isLoginButton={isLoginButton}
      />
      <p>{email}</p>
      <button onClick={verifyToken}>verify</button>
    </div>
  );
}
