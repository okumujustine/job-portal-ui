import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import AdminProtection from "./features/common/AdminProtection";
import JobApplicantsDetail from "./features/admin/JobApplicantsDetail";
import EmployeeProfile from "./features/jobs/EmployeeProfile";
import EmployerProfile from "./features/admin/EmployerProfile";

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

            <Route path="/jobdetails/:slug">
              <JobDetails />
            </Route>
            <Route path="/about">
              <AboutUs />
            </Route>
            <Route path="/auth/email-verify/:email/:token">
              <VerfyEmail />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>

            {/* employee */}
            <Route path="/applications">
              <EmployeeApplication />
            </Route>
            <Route path="/employee-dashboard">
              <EmployeeApplication />
            </Route>
            <Route path="/employee-profile">
              <EmployeeProfile />
            </Route>

            {/* employer */}
            <Route path="/admin-job-applications">
              <EmployerApplications />
            </Route>
            <AdminProtection
              path="/admin-job-applications-detail/:slug"
              component={JobApplicantsDetail}
            />
            <AdminProtection path="/admin-addjob" component={AddJob} />
            <AdminProtection path="/admin-dashboard" component={Dashboard} />
            <AdminProtection
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
