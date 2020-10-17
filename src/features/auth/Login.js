import * as React from "react";
import { connect } from "react-redux";

import { loginUser } from "../../redux/actions/auth/AuthAction";
import "./Auth.css";
import { Redirect } from "react-router-dom";

function Login({ authState, loginUser }) {
  const { isAuthenticated } = authState;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onLoginUser = (event) => {
    event.preventDefault();
    loginUser({ email, password });
  };

  return (
    <form
      onSubmit={onLoginUser}
      className="auth-form flex flex-col w-5/12 m-auto"
    >
      <h1 className="font-bold self-center uppercase">Login Here</h1>
      <div className="flex flex-col mt-6">
        <label>Email Address:</label>
        <input
          className="auth-form-input"
          placeholder="email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mt-6">
        <label>Password</label>
        <input
          className="auth-form-input"
          placeholder="password"
          password="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="mt-6 auth-button" type="submit">
        login
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
