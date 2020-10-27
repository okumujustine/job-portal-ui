import * as React from "react";
import DashboardNavigation from "./DashboardNavigation";
import { connect } from "react-redux";
import axios from "axios";

import { appTokenConfig } from "../../helperfuncs/token";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";

function Dashboard({ loadUserWhenAlreadyLoggedIn }) {
  const [statsJobPosted, setStatsJobPosted] = React.useState(0);
  const [statsApplications, setStatsApplications] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;

    const getEmployerStats = async () => {
      await loadUserWhenAlreadyLoggedIn();

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
            console.log(res);
            setStatsJobPosted(res.data.posted_jobs_count);
            setStatsApplications(res.data.job_applications_count);
          }
        })
        .catch((error) => {
          console.log("error");
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
          <div className="font-bold rounded-md py-12 px-4 shadow-md w-4/12 flex justify-center items-center flex-col">
            <h5>JOBS POSTED</h5>
            <span className="font-bold text-5xl">{statsJobPosted}</span>
          </div>
          <div className="font-bold rounded-md py-12 px-4 shadow-md w-4/12 flex justify-center items-center flex-col">
            <h5>APPLICATIONS</h5>
            <span className="font-bold text-5xl">{statsApplications}</span>
          </div>
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
