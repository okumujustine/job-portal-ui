import * as React from "react";
import axios from "axios";
import moment from "moment";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import DashboardNavigation from "./DashboardNavigation";
import { appTokenConfig } from "../../helperfuncs/token";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import "../../components/PaginationCustom.css";

function Applications({ authState, loadUserWhenAlreadyLoggedIn }) {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);
  const [itemCount, setItemCount] = React.useState(0);

  const alert = useAlert();

  const getUserJobs = async (pageNumber) => {
    await loadUserWhenAlreadyLoggedIn();
    const loggedInToken = await getLoggedInToken();
    if (!loggedInToken) {
      alert.error("log in please!");
      return;
    }

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
        console.log("error");
        setError("failed to load jobs, try again later!");
      });
  };

  React.useEffect(() => {
    getUserJobs(1);
  }, []);

  const getUserJobsPaginate = (pageNumber = 1) => {
    getUserJobs(pageNumber);
  };

  return (
    <div className="flex flex-row mt-6">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
        <h5>Applications</h5>
        <div className="px-20">
          <div className=" py-8 w-full">
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Title
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Published
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Days ago
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Applicants
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Status
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {jobs.map((job) => (
                    <React.Fragment key={job.id}>
                      <tr>
                        <td className="w-1/3 text-left py-3 px-4">
                          {job.title}
                        </td>
                        <td className="w-1/3 text-left py-3 px-4">
                          {moment(job.published).format("YYYY-MM-DD")}
                        </td>
                        <td className="w-1/3 text-left py-3 px-4">
                          {moment(job.published).fromNow()}
                        </td>
                        <td className="w-1/3 text-left py-3 px-4">
                          {job.status}
                        </td>
                        <td className="w-1/3 text-left py-3 px-4 font-bold">
                          {job.application_count === 0
                            ? "No applicants"
                            : job.application_count + " applicant(s)"}
                        </td>
                        <td className="text-left py-3 px-4">
                          <Link
                            to={{
                              pathname: `/admin-job-applications-detail/${job.slug}`,
                              state: job,
                            }}
                            className="text-white bg-jobBlue-800 px-2 py-1 font-bold shadow-sm rounded-md"
                            href="tel:622322662"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            itemClass="page-item"
            firstPageText="First"
            lastPageText="Last"
            linkClass="page-link"
            activePage={currentPage}
            totalItemsCount={itemCount}
            itemsCountPerPage={5}
            onChange={(pageNumber) => getUserJobsPaginate(pageNumber)}
          />
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