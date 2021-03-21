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

  const getJobsData = (pageNumber) => {
    setLoading(true);
    const searchData = { title };
    axiosInstance
      .get(`/joblisting/filter/?page=${pageNumber}`, {
        params: searchData,
      })
      .then((res) => {
        setjobCurrentPage(res.data.current);
        setJobs(res.data.results);
        setItemCount(res.data.count);
        setLoading(false);
        setTitle("");
      })
      .catch(() => {
        setLoading(false);
        setTitle("");
      });
  };

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
      <div className="flex w-7/12 mx-auto flex-col m-auto">
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
          <DisplayJobs jobs={jobs} isLoading={loading} />
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
