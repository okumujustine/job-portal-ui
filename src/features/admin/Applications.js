import React from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";

import DashboardNavigation from "./DashboardNavigation";
import { appTokenConfig } from "../../helperfuncs/token";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { getLoggedInToken } from "../../helperfuncs/getToken";

export default function Applications() {
  const [jobs, setJobs] = React.useState([]);
  const [error, setError] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [currentPage, setjobCurrentPage] = React.useState(1);
  const [itemCount, setItemCount] = React.useState(0);

  const alert = useAlert();

  const getUserJobs = async (pageNumber) => {
    await loadUserWhenAlreadyLoggedIn();
    const loggedInToken = await getLoggedInToken();
    if (!loggedInToken) {
      alert.error("log in please!");
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/joblisting/admin/userjobs/?page=${pageNumber}&title=${title}`,
        appTokenConfig(loggedInToken)
      )
      .then((res) => {
        setjobCurrentPage(res.data.current);
        setJobs(res.data.results);
        setItemCount(res.data.count);
        console.log(res);
      })
      .catch((error) => {
        setError("failed to load jobs, try again later!");
      });
  };

  React.useEffect(() => {
    getUserJobs(1);
  }, []);

  return (
    <div className="flex flex-row">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
        <h5>Applications</h5>
      </div>
    </div>
  );
}
