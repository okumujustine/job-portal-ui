import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import { authTokenKey, userRoleKey } from "../common/constants";

const EmployerProtection = ({ component: Component, authState, ...rest }) => {
  const authToken = localStorage.getItem(authTokenKey);
  const userRole = localStorage.getItem(userRoleKey);

  const alert = useAlert();

  if (!authToken && !userRole) {
    alert.error("loggin as admin to access this route");
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authToken && userRole === "admin") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});

export default connect(mapStateToProps, null)(EmployerProtection);
