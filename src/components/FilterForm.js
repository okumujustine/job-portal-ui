import * as React from "react";
import Pagination from "react-js-pagination";

import DisplayJobs from "../features/jobs/DisplayJobs";
import "../components/PaginationCustom.css";
import { axiosInstance } from "../services/axios";

export default function FilterForm() {
  const [jobs, setJobs] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);
  const [itemCount, setItemCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getJobsData = (pageNumber) => {
    setLoading(true);
    setError(null);
    const searchData = { title };
    axiosInstance
      .get(`/joblisting/filter/?page=${pageNumber}`, {
        params: searchData,
      })
      .then((res) => {
        setTimeout(function () {
          setjobCurrentPage(res.data.current);
          setJobs(res.data.results);
          setItemCount(res.data.count);
          setLoading(false);
          setTitle("");
        }, 1000);
      })
      .catch(() => {
        setError("Failed to load jobs, try again later");
        setLoading(false);
        setTitle("");
      });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getJobsData(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getJobsDataPaginate = (pageNumber = 1) => {
    getJobsData(pageNumber);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    getJobsData(1);
  };

  const onSelectFilter = (e) => {
    getJobsData(1);
  };

  return (
    <React.Fragment>
      <div className="flex lg:w-8/12 md:w-10/12 md:mx-auto lg:mx-auto w-11/12 mx-2 flex-col mt-10">
        <div className="flex flex-row mb-6 w-full">
          <form className="flex flex-col w-full" onSubmit={onSubmitSearch}>
            <input
              value={title}
              placeholder="search by title ....."
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-sm mb-3 border px-5 py-2"
            />
            <div className="flex flex-row">
              <button className="mr-3 w-20 text-sm text-white rounded-sm font-bold px-1 py-2 focus:outline-none bg-jobBlue-800">
                Search
              </button>
              <button
                className="w-20 text-sm text-white rounded-sm font-bold px-1 py-2 focus:outline-none bg-jobBlue-800"
                onClick={onSelectFilter}
              >
                All Jobs
              </button>
            </div>
          </form>
        </div>

        <div>
          <DisplayJobs jobs={jobs} isLoading={loading} error={error} />
          <Pagination
            itemClass="page-item"
            firstPageText="First"
            lastPageText="Last"
            linkClass="page-link"
            activePage={currentPage}
            totalItemsCount={itemCount}
            itemsCountPerPage={5}
            onChange={(pageNumber) => getJobsDataPaginate(pageNumber)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
