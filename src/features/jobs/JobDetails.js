import React from "react";
import _ from "lodash";
import { useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";

import JobDetailsTitleBar from "./JobDetailsTitleBar";
import ApplyJobModal from "./ApplyJobModal";

function JobDetails({ authState }) {
  const [showModal, setShowModal] = React.useState(false);
  const [job, setJob] = React.useState([]);
  const { state } = useLocation();

  React.useEffect(() => {
    if (_.isEmpty(state)) {
      // TODO: retrieve details by slug and set to state
    } else {
      setJob(state);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const applyForJob = async () => {
    setShowModal(true);
  };

  return (
    <>
      <ApplyJobModal
        showModal={showModal}
        setShowModal={setShowModal}
        job={job}
      />
      <div>
        <JobDetailsTitleBar job={job} />
        <div className="flex flex-col w-10/12 m-auto lg:flex-row md:flex-row xl:flex-row">
          <div className="flex flex-col lg:w-8/12 lg:m-auto xl:w-8/12 xl:m-auto md:w-8/12 md:m-auto">
            <div
              className="job-image-section ml-2 focus:outline-none my-4"
              style={{
                backgroundImage: job.company_logo
                  ? `url(${job.company_logo})`
                  : "url(" +
                    "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" +
                    ")",
              }}
            ></div>
            <div className="pb-4 flex flex-col md:flex-row lg:flex-row xl:flex-row">
              <h5 className="capitalize text-lg">{job.title}</h5>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          </div>
          <div>
            <h5 className="font-bold py-3">Overview</h5>
            <div className="px-4 py-10 rounded-md border-2 mb-10">
              <ul>
                <li className="flex mb-3">
                  <p>
                    <i className="far fa-compass"></i>
                  </p>
                  <div className="flex flex-col ml-2">
                    <strong>Location:</strong>
                    <span>{job.company_location}</span>
                  </div>
                </li>
                <li className="flex mb-3">
                  <p>
                    <i className="fas fa-clock"></i>
                  </p>
                  <div className="flex flex-col ml-2">
                    <strong>Deadline:</strong>
                    <span>{job.dateline}</span>
                  </div>
                </li>

                <li className="flex mb-6">
                  <p>
                    <i className="far fa-money-bill-alt"></i>
                  </p>
                  <div className="flex flex-col ml-2">
                    <strong>Salary:</strong>
                    <span>
                      min {job.salary_range_from} - max
                      {job.jobsalary_range_to
                        ? job.jobsalary_range_to
                        : job.salary_range_from}
                      ({job.salary_currency})
                    </span>
                  </div>
                </li>
                <li className="flex justify-center flex-col">
                  {authState && authState.isAuthenticated ? (
                    <button
                      onClick={() => applyForJob()}
                      className="aplply-job-button px-2 py-2 rounded-md focus:outline-none"
                    >
                      Apply Here
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="aplply-job-button px-2 py-2 rounded-md focus:outline-none text-center"
                    >
                      Log In to Apply
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, null)(JobDetails);
