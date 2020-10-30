import * as React from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

import DisplayJobs from "../features/jobs/DisplayJobs";
import "../components/PaginationCustom.css";

export default function FilterForm() {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);
  const [itemCount, setItemCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const getJobsData = (pageNumber) => {
    setLoading(true);
    const searchData = { title, type };
    axios
      .get(`http://127.0.0.1:8000/joblisting/filter/?page=${pageNumber}`, {
        params: searchData,
      })
      .then((res) => {
        setjobCurrentPage(res.data.current);
        setJobs(res.data.results);
        setItemCount(res.data.count);
        setLoading(false);
        setTitle("");
        setType("");
      })
      .catch((error) => {
        setError("failed to load jobs, try again later!");
        setLoading(false);
        setTitle("");
        setType("");
      });
  };

  React.useEffect(() => {
    getJobsData(1);
  }, []);

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
      <div className="flex w-10/12 m-auto justify-between">
        <div className="w-8/12">
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
        <div className="w-3/12 fixed" style={{ right: "5%" }}>
          <h4 className="sort-font">Sort by</h4>

          <button
            className="border-2 px-2 mb-4 font-bold bg-blue-200 focus:outline-none"
            onClick={onSelectFilter}
          >
            All Jobs
          </button>

          <form onSubmit={onSubmitSearch}>
            <input
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="job-search-input mb-2 rounded-sm"
            />
            <input
              placeholder="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="job-search-input mb-2 rounded-sm"
            />
            <button className="search-button rounded-sm font-bold px-6 py-2 focus:outline-none bg-jobBlue-800">
              Filter
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
