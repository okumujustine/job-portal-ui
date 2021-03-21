import * as React from "react";
import DashboardNavigation from "./DashboardNavigation";
import _ from "lodash";
import { axiosInstance } from "../../services/axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";

import { TableLoaders } from "../../components/Loaders";

function JobApplicantsDetail() {
  const [jobApplications, setJobApplications] = React.useState(null);
  const [error, setError] = React.useState(null);

  const { state } = useLocation();

  React.useEffect(() => {
    let isMounted = true;
    if (_.isEmpty(state)) {
      // TODO: retrieve details by slug and set to state
    } else {
      const getJobApplications = async () => {
        axiosInstance
          .get(`/joblisting/jobapplications/?id=${state.id}`)
          .then((res) => {
            if (isMounted) {
              console.log(res.data);
              setJobApplications(res.data);
            }
          })
          .catch(() => {
            setError("failed to load jobs, try again later!");
          });
      };
      getJobApplications();
    }
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
        <div className="px-20">
          <h5 className="capitalize font-bold text-2xl">
            {state.title} Applicants
          </h5>
          {error && (
            <h5 className="font-bold text-3xl mt-12 py-5 px-8 border-2 border-jobBlue-100">
              Error loading jobs, try again later
            </h5>
          )}
          {!jobApplications && !error ? (
            <TableLoaders />
          ) : jobApplications.length > 0 ? (
            <div className=" py-4 w-full">
              <div className="shadow overflow-hidden rounded border-b border-gray-200">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Name
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Email
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Date
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Resume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {jobApplications.map((jobApplic) => (
                      <React.Fragment key={jobApplic.id}>
                        <tr>
                          <td className="w-1/3 text-left py-2 px-4">
                            {jobApplic.first_name} {jobApplic.last_name}
                          </td>
                          <td className="w-1/3 text-left py-2 px-4 hover:text-jobBlue-800">
                            <button
                              onClick={() =>
                                window.open(
                                  `mailto:${jobApplic.email}`,
                                  "_blank"
                                )
                              }
                            >
                              {jobApplic.email}
                            </button>
                          </td>
                          <td className="w-1/3 text-left py-2 px-4">
                            {moment(jobApplic.application_created_at).format(
                              "YYYY-MM-DD"
                            )}
                          </td>
                          <td className="w-1/3 text-left py-2 px-4 font-bold">
                            {jobApplic.resume_file ? (
                              <button
                                className="bg-jobBlue-800 py-1 px-3 rounded-md font-bold text-white"
                                onClick={() =>
                                  window.open(jobApplic.resume_file, "_blank")
                                }
                              >
                                Link
                              </button>
                            ) : (
                              <button
                                className="bg-jobBlue-800 py-1 px-3 rounded-md font-bold text-white"
                                onClick={() =>
                                  window.open(
                                    jobApplic.profile_resume,
                                    "_blank"
                                  )
                                }
                              >
                                Link
                              </button>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h5 className="font-bold text-3xl mt-12 py-5 px-8 border-2 border-jobBlue-100">
              No Job Applications yet
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, null)(JobApplicantsDetail);
