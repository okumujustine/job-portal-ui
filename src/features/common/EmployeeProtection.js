import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authTokenKey, userRoleKey } from "../common/constants";

const EmployeeProtection = ({ component: Component, authState, ...rest }) => {
  const authToken = localStorage.getItem(authTokenKey);
  const userRole = localStorage.getItem(userRoleKey);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authToken && userRole === "employee") {
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

export default connect(mapStateToProps, null)(EmployeeProtection);
