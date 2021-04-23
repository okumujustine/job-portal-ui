import * as React from "react";
import moment from "moment";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import DashboardNavigation from "./DashboardNavigation";
import { axiosInstance } from "../../services/axios";
import "../../components/PaginationCustom.css";
import { TableLoaders } from "../../components/Loaders";
import Label from "../../components/Label";

function Applications() {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);
  const [itemCount, setItemCount] = React.useState(0);

  const isMounted = React.useRef();

  const getUserJobs = async (pageNumber) => {
    setLoading(true);
    setError("");

    axiosInstance
      .get(`/joblisting/admin/userjobs/?page=${pageNumber}&title=`)
      .then((res) => {
        if (isMounted.current) {
          setTimeout(function () {
            setjobCurrentPage(res.data.current);
            setJobs(res.data.results);
            setItemCount(res.data.count);
            setLoading(false);
          }, 1000);
        }
      })
      .catch(() => {
        setError("failed to load jobs, try again later!");
        setLoading(false);
      });
  };

  React.useEffect(() => {
    isMounted.current = true;
    getUserJobs(1);
    return () => {
      isMounted.current = false;
    };
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
        <div className="px-20">
          <Label label="Jobs/Applications" />
          <div className=" py-8 w-full">
            {error && !loading && (
              <h5 className="font-bold text-3xl mt-12 py-5 px-8 border-2 border-jobBlue-100">
                Error loading jobs, try again later
              </h5>
            )}

            {!error && loading ? (
              <TableLoaders />
            ) : jobs && jobs.length > 0 ? (
              <table className="bg-white">
                <thead>
                  <tr>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Title
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Published on
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Status
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Applicants
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">
                  {jobs.map((job) => (
                    <React.Fragment key={job.id}>
                      <tr>
                        <td className="border px-8 py-4 font-bold">
                          {job.title}
                        </td>
                        <td className="border px-8 py-4">
                          {moment(job.published).format("YYYY-MM-DD")}(
                          {moment(job.published).fromNow()})
                        </td>
                        <td className="border px-8 py-4">{job.status}</td>
                        <td className="border px-8 py-4">
                          {job.application_count}
                        </td>
                        <td className="border px-8 py-4">
                          <Link
                            to={{
                              pathname: `/admin-job-applications-detail/${job.slug}`,
                              state: job,
                            }}
                            className="text-white bg-blue-700 px-2 py-1 font-bold shadow-sm hover:bg-jobBlue-100"
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
            ) : (
              <h5 className="font-bold text-3xl mt-12 py-5 px-8 border-2 border-jobBlue-100">
                No Job Applications yet
              </h5>
            )}
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
export default connect(mapStateToProps, null)(Applications);
