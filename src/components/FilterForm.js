import * as React from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

import DisplayJobs from "../features/jobs/DisplayJobs";
import "../components/PaginationCustom.css";

export default function FilterForm() {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);

  const getJobsData = (pageNumber = 1) => {
    const searchData = { title, category, type };
    axios
      .get(`http://127.0.0.1:8000/joblisting/filter/?page=${pageNumber}`, {
        params: searchData,
      })
      .then((res) => {
        setjobCurrentPage(res.current);
        setJobs(res.data.results);
      })
      .catch((error) => {
        setError("failed to load jobs, try again later!");
      });
  };

  React.useEffect(() => {
    getJobsData();
  }, []);

  const getJobsDataPaginate = (pageNumber = 1) => {
    getJobsData(pageNumber);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    getJobsData();
  };

  return (
    <React.Fragment>
      <div className="flex w-10/12 m-auto justify-between">
        <div className="w-8/12">
          <DisplayJobs jobs={jobs} />
          <Pagination
            itemClass="page-item"
            firstPageText="First"
            lastPageText="Last"
            linkClass="page-link"
            activePage={currentPage}
            totalItemsCount={2}
            itemsCountPerPage={1}
            onChange={(pageNumber) => getJobsDataPaginate(pageNumber)}
          />
        </div>
        <div className="w-3/12 fixed" style={{ right: "5%" }}>
          <h4 className="sort-font">Sort by</h4>
          <form onSubmit={onSubmitSearch}>
            <input
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="job-search-input mb-2 rounded-sm"
            />
            <input
              placeholder="category"
              onChange={(e) => setCategory(e.target.value)}
              className="job-search-input mb-2 rounded-sm"
            />
            <input
              placeholder="type"
              onChange={(e) => setType(e.target.value)}
              className="job-search-input mb-2 rounded-sm"
            />
            <button className="search-button rounded-sm font-bold px-6 py-2 focus:outline-none">
              Filter
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
