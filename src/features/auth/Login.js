import * as React from "react";
import { connect } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import { loginUser } from "../../redux/actions/auth/AuthAction";
import AuthDialog from "./AuthDialog";
import { axiosInstance } from "../../services/axios";
import { config } from "../../helperfuncs/token";
import "./Auth.css";

function Login({ authState, loginUser }) {
  const { isAuthenticated, loginFailedError } = authState;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isEmailInput, setIsEmailInput] = React.useState(false);
  const [isEmailLoading, setIsEmailLoading] = React.useState(false);

  const alert = useAlert();
  let location = useLocation();
  const history = useHistory();


  React.useEffect(() => {
    if (location?.state?.registered) {
      setOpenAuthDialog(true)
      setDialogMessage("Registered, follow the link sent to your email address to verify your account. (check your spam if you don't see the message in about 5 mins)");
      history.replace({ ...location, state: {} });
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (loginFailedError && loginFailedError === "Email is not verified") {
      setIsError(true);
      setIsEmailInput(true);
      setDialogMessage("email is not verified, send a new verification link");
      setOpenAuthDialog(true);
      return;
    }

    if (loginFailedError) {
      alert.error(loginFailedError);
      return;
    }
  }, [authState]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onLoginUser = (event) => {
    event.preventDefault();
    loginUser({ email, password });
  };

  const closeAuthDialog = () => {
    setOpenAuthDialog(false);
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
    setIsEmailLoading(true);
    const userEmail = e.target[0].value;

    axiosInstance
      .post(`/auth/re-verify/`, { email: userEmail }, config)
      .then((res) => {
        alert.success("Activation email sent");
        setIsEmailLoading(false);
        setOpenAuthDialog(false);
      })
      .catch((error) => {
        setIsEmailLoading(false);
        setOpenAuthDialog(false);
        alert.error(error.response.data);
      });
  };

  return (
    <React.Fragment>
      <AuthDialog
        isOpen={openAuthDialog}
        isClose={closeAuthDialog}
        isError={isError}
        content={dialogMessage}
        isEmailInput={isEmailInput}
        isEmailLoading={isEmailLoading}
        onSubmitEmail={onSubmitEmail}
      />

      <form
        onSubmit={onLoginUser}
        className="auth-form flex flex-col w-11/12 lg:w-5/12 m-auto"
      >
        <h1 className="font-bold self-center text-3xl">Login Here</h1>
        <div className="flex flex-col mt-6">
          <label>Email Address:</label>
          <input
            className="auth-form-input"
            placeholder="email address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-6">
          <label>Password</label>
          <input
            type="password"
            className="auth-form-input"
            placeholder="password"
            password="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-6 auth-button" type="submit">
          login
        </button>
        <Link className="text-blue-800 text-center font-bold" to={`/auth/request-password-reset`}>Forgot password?</Link>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
