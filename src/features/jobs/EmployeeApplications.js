import * as React from "react";
import moment from "moment";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";

import { axiosInstance } from "../../services/axios";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import EmployeeNavigation from "./EmployeeNavigation";
import {
  TableLoaders,
  CardLoaders,
  LabelLoaders,
} from "../../components/Loaders";
import Label from "../../components/Label";

function EmplyeeApplications({ loadUserWhenAlreadyLoggedIn }) {
  const [employeeApplications, setEmployeeApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [applicationsCurrentPage, setApplicationsCurrentPage] = React.useState(
    0
  );
  const [applicationsCount, setApplicationsCount] = React.useState(0);

  async function getEmployeeApplications(pageNumber) {
    await loadUserWhenAlreadyLoggedIn();

    setLoading(true);
    axiosInstance
      .get(`/joblisting/userapplications/?page=${pageNumber}`)
      .then((res) => {
        setTimeout(function () {
          setEmployeeApplications(res.data.results);
          setApplicationsCurrentPage(res.data.current);
          setApplicationsCount(res.data.count);
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setError("failed to fetch data try again later");
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getEmployeeApplications(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const employeesApplicationPaginate = (pageNumber = 1) => {
    getEmployeeApplications(pageNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row mt-6">
      <div>
        <EmployeeNavigation />
      </div>
      <div className=" w-full lg:w-10/12 m-auto ">
        <div className="lg:px-20">
          <div className=" lg:ml-0 py-8 w-full">
            {!loading ? (
              <div className="ml-2 flex justify-between">
                <div className="font-bold rounded-md py-4 mb-5 px-2 shadow-md w-5/12 flex justify-center items-center flex-col">
                  <h5>APLLICATIONS</h5>
                  <span className="font-bold text-5xl">
                    {applicationsCount}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-5">
                <CardLoaders />
                <LabelLoaders />
                <TableLoaders />
              </div>
            )}
            {error && (
              <h5 className="font-bold text-3xl mt-12 py-5 px-8 border-2 border-jobBlue-100">
                No Job Applications yet
              </h5>
            )}
            <React.Fragment>
              {!employeeApplications && !error ? (
                <TableLoaders />
              ) : employeeApplications.length > 0 ? (
                <div className="overflow-x-scroll mx-2">
                  <Label label="Recent applications" />
                  <table className="min-w-full bg-white mt-2 w-full">
                    <thead>
                      <tr>
                        <th className="bg-blue-100 border text-left px-4 py-2 lg:px-8 lg:py-4">
                          Title
                        </th>
                        <th className="bg-blue-100 border text-left px-4 py-2 lg:px-8 lg:py-4">
                          Company
                        </th>
                        <th className="bg-blue-100 border text-left px-4 py-2 lg:px-8 lg:py-4">
                          Date
                        </th>
                        <th className="bg-blue-100 border text-left px-4 py-2 lg:px-8 lg:py-4">
                          status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {employeeApplications.map((employeeApplic) => (
                        <React.Fragment key={employeeApplic.id}>
                          <tr>
                            <td className="border px-4 py-2 lg:px-8 lg:py-4">
                              {employeeApplic.job.title}
                            </td>
                            <td className="border px-4 py-2 lg:px-8 lg:py-4">
                              {employeeApplic.job.company_name}
                            </td>
                            <td className="border px-4 py-2 lg:px-8 lg:py-4">
                              {moment(
                                employeeApplic.application_created_at
                              ).format("YYYY-MM-DD")}
                              (
                              {moment(
                                employeeApplic.application_created_at
                              ).fromNow()}
                              )
                            </td>
                            <td className="border px-4 py-2 lg:px-8 lg:py-4">
                              {employeeApplic.status}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </React.Fragment>
          </div>
          <Pagination
            itemClass="page-item"
            firstPageText="First"
            lastPageText="Last"
            linkClass="page-link"
            activePage={applicationsCurrentPage}
            totalItemsCount={applicationsCount}
            itemsCountPerPage={5}
            onChange={(pageNumber) => employeesApplicationPaginate(pageNumber)}
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
  EmplyeeApplications
);
