import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const xx_auth_token_storage_key = "jobPortalToken";
const xx_user_role_storage_key = "jobPortalUserRole";

const EmployerProtection = ({ component: Component, authState, ...rest }) => {
  const authToken = localStorage.getItem(xx_auth_token_storage_key);
  const userRole = localStorage.getItem(xx_user_role_storage_key);

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
