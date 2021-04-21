import * as React from "react";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { axiosInstance } from "../../services/axios";
import DashboardNavigation from "./DashboardNavigation";
import { TableLoaders } from "../../components/Loaders";
import Label from "../../components/Label";

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
          <Link
            to="/admin-job-applications"
            className="text-white bg-blue-700 px-2 py-1 font-bold shadow-sm hover:bg-jobBlue-100"
          >
            {"< Back"}
          </Link>
          <Label label="Job title" />
          <h5 className="capitalize font-bold text-2xl">{state.title}</h5>
          {error && (
            <h5 className="font-bold text-3xl mt-12 py-5 px-8 border-2 border-jobBlue-100">
              Error loading jobs, try again later
            </h5>
          )}
          {!jobApplications && !error ? (
            <TableLoaders />
          ) : jobApplications.length > 0 ? (
            <div className=" py-4 w-full">
              <Label label="Job Applicants" />
              <table className="min-w-full bg-white mt-2">
                <thead>
                  <tr>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Name
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Email
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Date
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Resume
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {jobApplications.map((jobApplic) => (
                    <React.Fragment key={jobApplic.id}>
                      <tr>
                        <td className="border px-8 py-4">
                          {jobApplic.first_name} {jobApplic.last_name}
                        </td>
                        <td className="border px-8 py-4">
                          <button
                            onClick={() =>
                              window.open(`mailto:${jobApplic.email}`, "_blank")
                            }
                          >
                            {jobApplic.email}
                          </button>
                        </td>
                        <td className="border px-8 py-4">
                          {moment(jobApplic.application_created_at).format(
                            "YYYY-MM-DD"
                          )}
                          ( {moment(jobApplic.application_created_at).fromNow()}
                          )
                        </td>
                        <td className="border px-8 py-4">
                          {jobApplic.resume_file ? (
                            <button
                              className="bg-blue-700 hover:bg-jobBlue-100 py-1 px-3 font-bold text-white"
                              onClick={() =>
                                window.open(jobApplic.resume_file, "_blank")
                              }
                            >
                              Link
                            </button>
                          ) : (
                            <button
                              className="bg-blue-700 hover:bg-jobBlue-100 py-1 px-3 font-bold text-white"
                              onClick={() =>
                                window.open(jobApplic.profile_resume, "_blank")
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
