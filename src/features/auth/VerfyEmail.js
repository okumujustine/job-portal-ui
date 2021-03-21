import * as React from "react";
import { useParams } from "react-router-dom";

import { axiosInstance } from "../../services/axios";
import { useAlert } from "react-alert";

import Loader from "react-loader-spinner";

import AuthDialog from "./AuthDialog";

export default function VerfyEmail() {
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [isLoginButton, setIsLoginButton] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);

    axiosInstance
      .get(`/auth/email-verify/?email=${email}&token=${token}`)
      .then((res) => {
        setIsLoginButton(true);
        setOpenAuthDialog(true);
        setDialogMessage(res.data.email);
      })
      .catch((error) => {
        setIsError(true);
        setDialogMessage(error.response.data.error);
        setOpenAuthDialog(true);
        setLoading(false);
      });
  };

  const closeAuthDialog = () => {
    setOpenAuthDialog(false);
  };

  return (
    <div>
      <AuthDialog
        isOpen={openAuthDialog}
        isClose={closeAuthDialog}
        isError={isError}
        content={dialogMessage}
        isLoginButton={isLoginButton}
      />
      <div className="flex flex-col items-center justify-center py-12">
        <h5 className="text-2xl font-bold py-6">verify email address</h5>

        <h5 className="text-2xl font-bold">{email}</h5>
        <button
          className="bg-jobBlue-800 py-2 px-4 font-bold text-white mt-6 flex justify-center items-center"
          onClick={verifyToken}
          style={{
            minWidth: "200px",
            minHeight: "40px",
            backgroundColor: loading && "#ebebe4",
          }}
          disabled={loading}
        >
          {!loading ? (
            "Confirm Verification"
          ) : (
            <Loader
              type="Puff"
              color="#FFFFFF"
              height={25}
              width={25}
              timeout={30000}
            />
          )}
        </button>
      </div>
    </div>
  );
}
