import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import history from "./routing";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import VerfyEmail from "./features/auth/VerfyEmail";
import { loadUser } from "./redux/actions/auth/AuthAction";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Jobs from "./features/jobs/Jobs";
import AboutUs from "./features/common/AboutUs";
import NotFound from "./features/common/NotFound";
import JobDetails from "./features/jobs/JobDetails";
import EmployeeApplication from "./features/jobs/EmployeeApplications";
import EmployerApplications from "./features/admin/Applications";
import Dashboard from "./features/admin/Dashboard";
import AddJob from "./features/admin/AddJob";
import EmployerProtection from "./features/common/EmployerProtection";
import JobApplicantsDetail from "./features/admin/JobApplicantsDetail";
import EmployeeProfile from "./features/jobs/EmployeeProfile";
import EmployerProfile from "./features/admin/EmployerProfile";
import EmployeeProtection from "./features/common/EmployeeProtection";
import RequestPwdReset from "./features/auth/RequestPwdReset";
import ConfirmPwdReset from "./features/auth/ConfirmPwdReset"
import "./App.css";

function App({ loadUser }) {
  React.useEffect(() => {
    loadUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Router history={history}>
        <Navigation />
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/jobs">
              <Jobs />
            </Route>

            <Route path="/jobdetails/:slug">
              <JobDetails />
            </Route>
            <Route path="/about">
              <AboutUs />
            </Route>
            <Route path="/auth/email-verify/:email/:token">
              <VerfyEmail />
            </Route>
            <Route path="/auth/request-password-reset">
              <RequestPwdReset />
            </Route>
            <Route path="/auth/confirm-password-reset/:uidb64/:token">
              <ConfirmPwdReset />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>

            {/* employee */}
            <EmployeeProtection
              path="/applications"
              component={EmployeeApplication}
            />
            <EmployeeProtection
              path="/employee-dashboard"
              component={EmployeeApplication}
            />
            <EmployeeProtection
              path="/employee-profile"
              component={EmployeeProfile}
            />

            {/* employer */}
            <EmployerProtection
              path="/admin-job-applications"
              component={EmployerApplications}
            />
            <EmployerProtection
              path="/admin-job-applications-detail/:slug"
              component={JobApplicantsDetail}
            />
            <EmployerProtection path="/admin-addjob" component={AddJob} />
            <EmployerProtection path="/admin-dashboard" component={Dashboard} />
            <EmployerProtection
              path="/employer-profile"
              component={EmployerProfile}
            />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default connect(null, { loadUser })(App);
