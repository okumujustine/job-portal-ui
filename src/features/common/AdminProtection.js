import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const AdminProtection = ({ component: Component, authState, ...rest }) => {
  const authToken = localStorage.getItem("jobPortalToken");
  const userRole = localStorage.getItem("jobPortalUserRole");

  const alert = useAlert();

  if (!authToken && userRole) {
    alert.error("loggin as admin to access this route");
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authState.isLoading) {
          return <h2>Loading...</h2>;
        } else if (authToken && userRole === "admin") {
          console.log("admin");
          return <Component {...props} />;
        } else {
          console.log("not admin");
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

export default connect(mapStateToProps, null)(AdminProtection);
