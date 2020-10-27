import * as React from "react";
import axios from "axios";
import moment from "moment";

import { appTokenConfig } from "../../helperfuncs/token";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { connect } from "react-redux";

function EmplyeeApplications({ loadUserWhenAlreadyLoggedIn }) {
  const [employeeApplications, setEmployeeApplications] = React.useState([]);

  React.useEffect(() => {
    async function getUserApplications() {
      await loadUserWhenAlreadyLoggedIn();
      const loggedInToken = await getLoggedInToken();
      axios
        .get(
          "http://localhost:8000/joblisting/userapplications/",
          appTokenConfig(loggedInToken)
        )
        .then((res) => {
          console.log(res);
          setEmployeeApplications(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUserApplications();
  }, []);

  return (
    <div className="flex flex-row mt-6">
      <div className="w-10/12 m-auto">
        <div className="px-20">
          <div className=" py-8 w-full">
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
              {employeeApplications && (
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Title
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Date
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Days ago
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        status
                      </th>
                      <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                        Resume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {employeeApplications.map((employeeApplic) => (
                      <React.Fragment key={employeeApplic.id}>
                        <tr>
                          <td className="w-1/3 text-left py-3 px-4">
                            {employeeApplic.job}
                          </td>
                          <td className="w-1/3 text-left py-3 px-4">
                            {moment(
                              employeeApplic.application_created_at
                            ).format("YYYY-MM-DD")}
                          </td>
                          <td className="w-1/3 text-left py-3 px-4">
                            {moment(
                              employeeApplic.application_created_at
                            ).fromNow()}
                          </td>
                          <td className="w-1/3 text-left py-3 px-4">
                            {employeeApplic.status}
                          </td>
                          <td className="w-1/3 text-left py-3 px-4">
                            <button
                              className="bg-jobBlue-800 py-1 px-3 rounded-md font-bold text-white"
                              onClick={() =>
                                window.open(
                                  employeeApplic.resume_file,
                                  "_blank"
                                )
                              }
                            >
                              Link
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    //       <Pagination
    //         itemClass="page-item"
    //         firstPageText="First"
    //         lastPageText="Last"
    //         linkClass="page-link"
    //         activePage={currentPage}
    //         totalItemsCount={itemCount}
    //         itemsCountPerPage={5}
    //         onChange={(pageNumber) => getUserJobsPaginate(pageNumber)}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { loadUserWhenAlreadyLoggedIn })(
  EmplyeeApplications
);
