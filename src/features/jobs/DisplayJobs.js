import * as React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";
import { JobsLoaders } from "../../components/Loaders";

export default function DisplayJobs({ jobs, isLoading, error }) {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        {jobs.length === 0 && !isLoading && !error && <p>No jobs found</p>}
        {isLoading && <JobsLoaders />}
        {error && <p>error please try again</p>}
        {jobs.map((job) => (
          <Link
            to={{ pathname: `/jobdetails/${job.slug}`, state: job }}
            key={job.id}
            className=" job-card w-full rounded overflow-hidden shadow-sm p-6 flex mr-1 ml-1 mb-2 flex-col lg:flex-row md:flex-row xl:flex-row"
          >
            <Zoom>
              <div
                className="job-image-section ml-2 focus:outline-none"
                style={{
                  backgroundImage: job.company_logo
                    ? `url(${job.company_logo})`
                    : "url(" +
                      "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" +
                      ")",
                }}
              ></div>
            </Zoom>
            <div className="flex-1 flex md:justify-around lg:justify-around xl:justify-around">
              <div>
                <h4 className="job-list-title font-bold capitalize">
                  {job.title}
                </h4>
                <small className="text-gray-600 capitalize">
                  {job.company_name}
                </small>
                <div>
                  <small className="text-gray-600">
                    {moment(job.published).fromNow()}
                  </small>
                  <i className="fas fa-circle text-sm job-experience-status"></i>
                  <small className="text-gray-600 ">
                    Experience {job.experience} {job.experience_status}(s){" "}
                  </small>
                </div>
                <div className="mt-1 flex md:min-w-330 lg:min-w-330 xl:min-w-330 mb-3">
                  {job.tag_one ? (
                    <small className="p-1 px-2 bg-yellow-200 text-yellow-800 rounded-xl lowercase">
                      {job.tag_one}
                    </small>
                  ) : null}
                  {job.tag_two ? (
                    <small className="ml-1 p-1 px-2 bg-green-200 text-green-800 rounded-xl lowercase">
                      {job.tag_two}
                    </small>
                  ) : null}
                  {job.tag_three ? (
                    <small className="ml-1 p-1 px-2 bg-blue-200 text-blue-800 rounded-xl lowercase">
                      {job.tag_three}
                    </small>
                  ) : null}
                </div>
                {job.work_duration ? (
                  <small className="text-gray-600 capitalize font-bold">
                    Duration: {job.work_duration}
                  </small>
                ) : null}
              </div>
              <div className="hidden lg:block md:block xl:block">
                {job.employment_status === "Full Time" ? (
                  <small className="job-part-time p-1 ml-1 px-2 rounded-sm">
                    {job.employment_status}
                  </small>
                ) : null}
                {job.employment_status === "Part Time" ? (
                  <small className="job-full-time p-1 ml-1 px-2 rounded-sm">
                    {job.employment_status}
                  </small>
                ) : null}

                {job.employment_status === "Freelance" ? (
                  <small className="job-freelance p-1 ml-1 px-2 rounded-sm">
                    {job.employment_status}
                  </small>
                ) : null}

                {job.employment_status === "Internship" ? (
                  <small className="job-internship p-1 ml-1 px-2 rounded-sm">
                    {job.employment_status}
                  </small>
                ) : null}

                {job.employment_status === "Contract" ? (
                  <small className="job-contract p-1 ml-1 px-2 rounded-sm">
                    {job.employment_status}
                  </small>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
