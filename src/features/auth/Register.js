import React from "react";
import { useAlert } from "react-alert";
import { isPossiblePhoneNumber } from "react-phone-number-input";

import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import RegisterTabs from "./RegisterTabs";
import AuthDialog from "./AuthDialog";
import "./Auth.css";

export default function Register() {
  const [loading, setLoading] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState();
  const [userType, setUserType] = React.useState("employee");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [isLoginButton, setIsLoginButton] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");

  const alert = useAlert();
  let history = useHistory();

  const closeAuthDialog = () => {
    setOpenAuthDialog(false);
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (!firstName) {
      alert.error("First name address must be provided!");
      return;
    }
    if (!lastName) {
      alert.error("Last name address must be provided!");
      return;
    }
    if (!email) {
      alert.error("email address must be provided!");
      return;
    }
    if (!phoneNumber) {
      alert.error("Phone number must be provided!");
      return;
    }
    if (!isPossiblePhoneNumber(phoneNumber)) {
      alert.error("Provide a valid phone number!");
      return;
    }

    if (!password) {
      alert.error("password must be provided!");
      return;
    }
    if (!confirmPassword) {
      alert.error("confirm password must be provided!");
      return;
    }
    if (confirmPassword.trim().length < 6) {
      alert.error("confirm password must be more than 6 characters!");
      return;
    }
    if (password.trim().length < 6) {
      alert.error("password must be more than 6 characters!");
      return;
    }
    if (password !== confirmPassword) {
      alert.error("password and confirm password should match!");
      return;
    }

    setLoading(true);

    const registerBody = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      phone: phoneNumber,
      role: userType,
    };

    axiosInstance
      .post(`/auth/register/`, registerBody)
      .then((res) => {
        setIsLoginButton(false);
        setIsError(false);
        setDialogMessage(
          "follow the link sent to your email address to verify your account"
        );
        setOpenAuthDialog(true);

        setLoading(false);

        history.push("/login", { registered: true });
      })
      .catch((err) => {
        const { error } = err.response.data;
        setIsError(true);
        setDialogMessage(error);
        setOpenAuthDialog(true);

        setLoading(false);
      });
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

      <RegisterTabs
        color="jobBlue"
        setPhoneNumber={setPhoneNumber}
        setUserType={setUserType}
        userType={userType}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        registerUser={registerUser}
        phoneNumber={phoneNumber}
        loading={loading}
      />
    </div>
  );
}
