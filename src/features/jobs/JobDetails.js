import React from "react";
import _ from "lodash";

import JobDetailsTitleBar from "./JobDetailsTitleBar";
import { useParams, useLocation } from "react-router-dom";

export default function JobDetails() {
  const [job, setJob] = React.useState([]);
  let { slug } = useParams();
  const { state } = useLocation();

  React.useEffect(() => {
    if (_.isEmpty(state)) {
      // TODO: retrieve details by slug and set to state
      console.log("empty");
    } else {
      setJob(state);
    }
  }, []);

  return (
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
          <div className="mt-3 pb-6 mb-6 flex flex-col md:flex-row lg:flex-row xl:flex-row">
            <h5 className="capitalize text-lg">{job.title}</h5>
            <h6 className="text-sm md:pl-3 md:pt-1 lg:pt-1 xl:pt-1 lg:pl-3 xl:pl-3">
              http://justine@gmail.com
            </h6>
          </div>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
        <div>
          <h5 className="font-bold py-3">Overview</h5>
          <div className="px-4 py-10 rounded-md border-2 mb-10">
            <ul>
              <li className="flex mb-3">
                <p>icon</p>
                <div className="flex flex-col ml-2">
                  <strong>Location:</strong>
                  <span>{job.company_location}</span>
                </div>
              </li>
              <li className="flex mb-3">
                <p>icon</p>
                <div className="flex flex-col ml-2">
                  <strong>Deadline:</strong>
                  <span>{job.dateline}</span>
                </div>
              </li>

              <li className="flex mb-6">
                <p>icon</p>
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
              <li className="flex justify-center">
                <button className="aplply-job-button px-5 py-2 rounded-md">
                  Apply For This Job
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
