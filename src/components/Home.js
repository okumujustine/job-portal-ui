import * as React from "react";
import axios from "axios";

import "./Home.css";
import { Link } from "react-router-dom";
import DisplayJobs from "../features/jobs/DisplayJobs";
import Footer from "./Footer";

export default function Home() {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");

  const loadData = () => {
    axios
      .get("http://127.0.0.1:8000/joblisting/latest/")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        setError("failed to load jobs, try again later!");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="home-banner flex justify-center items-center flex-col">
        <span className="home-banner-title">Hire great hourly employees</span>
        <p className="text-white home-banner-caption-p">
          Work Scout is most trusted job board, connecting the world's <br />
          brightest minds with resume database loaded with talents.
        </p>
        <div>
          <Link className="banner-button-1" to="/">
            Find Your Dream Job
          </Link>
        </div>
      </div>
      <div className="bg-red flex flex-col lg:flex-row lg:w-10/12 lg:m-auto lg:justify-between">
        <div className="lg:w-8/12 w-11/12 m-auto">
          <h3 className="after-banner-span-text">Recent Jobs</h3>
          <div>
            <DisplayJobs jobs={jobs} />
          </div>
          <div className="flex flex-col items-center">
            <Link
              to="jobs"
              className="rounded-sm load-more-btn mt-12 mb-12 bg-jobBlue-800"
            >
              Load More Jobs
            </Link>
          </div>
        </div>
        <div className="lg:w-3/12 lg:block ">
          <h3 className="after-banner-span-text">Job Spotlight</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}
