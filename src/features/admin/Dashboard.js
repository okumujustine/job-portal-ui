import * as React from "react";
import DashboardNavigation from "./DashboardNavigation";
import { connect } from "react-redux";
import axios from "axios";
import { useAlert } from "react-alert";

import { appTokenConfig } from "../../helperfuncs/token";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { CardLoaders } from "../../components/Loaders";

function Dashboard({ loadUserWhenAlreadyLoggedIn }) {
  const [statsJobPosted, setStatsJobPosted] = React.useState(null);
  const [statsApplications, setStatsApplications] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const alert = useAlert();

  React.useEffect(() => {
    let isMounted = true;

    const getEmployerStats = async () => {
      await loadUserWhenAlreadyLoggedIn();

      setLoading(true);
      setError("");

      const loggedInToken = await getLoggedInToken();
      if (!loggedInToken) {
        alert.error("log in please!");
        return;
      }

      axios
        .get(
          "http://localhost:8000/joblisting/employers/stats/",
          appTokenConfig(loggedInToken)
        )
        .then((res) => {
          if (isMounted) {
            setStatsJobPosted(res.data.posted_jobs_count);
            setStatsApplications(res.data.job_applications_count);
            setLoading(false);
          }
        })
        .catch((error) => {
          alert.error("failed to load job stats, try again later");
          setLoading(false);
          setError("failed to load job stats, try again later");
        });
    };

    getEmployerStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-row mt-6">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
        <div className="flex justify-around">
          {error && !loading && <p>{error}</p>}
          {loading && !error ? (
            <React.Fragment>
              <CardLoaders />
              <CardLoaders />
            </React.Fragment>
          ) : null}
          {statsApplications && statsJobPosted && !loading && !error ? (
            <React.Fragment>
              <div className="font-bold rounded-md py-12 px-4 shadow-md w-4/12 flex justify-center items-center flex-col">
                <h5>JOBS POSTED</h5>
                <span className="font-bold text-5xl">{statsJobPosted}</span>
              </div>
              <div className="font-bold rounded-md py-12 px-4 shadow-md w-4/12 flex justify-center items-center flex-col">
                <h5>APPLICATIONS</h5>
                <span className="font-bold text-5xl">{statsApplications}</span>
              </div>{" "}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { loadUserWhenAlreadyLoggedIn })(
  Dashboard
);
