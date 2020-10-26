import * as React from "react";
import axios from "axios";
import moment from "moment";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";

import DashboardNavigation from "./DashboardNavigation";
import { appTokenConfig } from "../../helperfuncs/token";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Applications({ authState, loadUserWhenAlreadyLoggedIn }) {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);
  const [itemCount, setItemCount] = React.useState(0);

  const alert = useAlert();

  const getUserJobs = async (pageNumber) => {
    console.log("start");
    await loadUserWhenAlreadyLoggedIn();
    const loggedInToken = await getLoggedInToken();
    if (!loggedInToken) {
      alert.error("log in please!");
      return;
    }
    console.log("end");

    axios
      .get(
        `http://127.0.0.1:8000/joblisting/admin/userjobs/?page=${pageNumber}&title=${title}`,
        appTokenConfig(loggedInToken)
      )
      .then((res) => {
        setjobCurrentPage(res.data.current);
        setJobs(res.data.results);
        setItemCount(res.data.count);
        console.log(res);
      })
      .catch((error) => {
        setError("failed to load jobs, try again later!");
      });
  };

  React.useEffect(() => {
    getUserJobs(1);
  }, []);

  return (
    <div className="flex flex-row">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
        <h5>Applications</h5>
        <div className="px-20">
          {jobs.map((job, index) => (
            <React.Fragment key={job.id}>
              <Link
                to="/"
                className="flex flex-row justify-between mb-3 p-4 shadow-sm hover:shadow-md"
              >
                <span>{index + 1}</span>
                <span>{job.title}</span>
                <span>
                  {moment(job.published).format("YYYY-MM-DD")}(
                  {moment(job.published).fromNow()})
                </span>
                <span>
                  {job.application_count === 0
                    ? "No applicants"
                    : job.application_count + " applicant(s)"}{" "}
                </span>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { loadUserWhenAlreadyLoggedIn })(
  Applications
);
