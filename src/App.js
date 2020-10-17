import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { loadUser } from "./redux/actions/auth/AuthAction";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Jobs from "./features/jobs/Jobs";
import AboutUs from "./features/common/AboutUs";
import JobDetails from "./features/jobs/JobDetails";

function App({ loadUser }) {
  React.useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <Router>
        <Navigation />
        <div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/jobs">
              <Jobs />
            </Route>
            <Route path="/jobdetails/:id">
              <JobDetails />
            </Route>
            <Route path="/about">
              <AboutUs />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default connect(null, { loadUser })(App);
