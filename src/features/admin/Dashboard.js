import * as React from "react";
import DashboardNavigation from "./DashboardNavigation";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

import { axiosInstance } from "../../services/axios";
import { CardLoaders } from "../../components/Loaders";

function Dashboard() {
  const [statsJobPosted, setStatsJobPosted] = React.useState(null);
  const [statsApplications, setStatsApplications] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const alert = useAlert();

  React.useEffect(() => {
    let isMounted = true;

    const getEmployerStats = async () => {
      setLoading(true);
      setError("");

      axiosInstance
        .get(`/joblisting/employers/stats/`)
        .then((res) => {
          setTimeout(function () {
            if (isMounted) {
              setStatsJobPosted(res.data.posted_jobs_count);
              setStatsApplications(res.data.job_applications_count);
              setLoading(false);
            }
          }, 1000);
        })
        .catch(() => {
          alert.error("failed to load job stats, try again later");
          setLoading(false);
          setError("failed to load job stats, try again later");
        });
    };

    getEmployerStats();

    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          {statsApplications !== null &&
          statsJobPosted !== null &&
          !loading &&
          !error ? (
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
export default connect(mapStateToProps, null)(Dashboard);
