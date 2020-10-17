import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, authState, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authState.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!authState.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
