import * as React from "react";
import EmployeeNavigation from "./EmployeeNavigation";
import { connect } from "react-redux";
import axios from "axios";
import { useAlert } from "react-alert";

import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { getLoggedInToken } from "../../helperfuncs/getToken";
import { appTokenConfig } from "../../helperfuncs/token";

function EmployeeProfile({ authState, loadUserWhenAlreadyLoggedIn }) {
  const [employeeResume, setEmployeeResume] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { user } = authState;
  const alert = useAlert();

  const saveResume = async (e) => {
    e.preventDefault();

    await loadUserWhenAlreadyLoggedIn();
    const loggedInToken = await getLoggedInToken();
    if (!loggedInToken) {
      alert.error("log in please!");
      return;
    }

    if (!employeeResume) {
      alert.error("select resume please");
      return;
    }

    const updateProfileFormData = new FormData();
    if (employeeResume && employeeResume.size > 2000000) {
      alert.error("file size too large!, should be 2MB or less");
      return;
    }
    if (employeeResume && !employeeResume.name.match(/\.(docx|pdf|doc)$/)) {
      alert.error("wrong file format use (pdf, docx)!");
      return;
    }

    if (employeeResume) {
      updateProfileFormData.append(
        "resume",
        employeeResume,
        employeeResume.name
      );
    }

    if (!user && !user.id) {
      alert.error("user id is required please");
    }

    setLoading(true);

    axios
      .patch(
        `http://127.0.0.1:8000/auth/profile/update/${user.id}/`,
        updateProfileFormData,
        appTokenConfig(loggedInToken)
      )
      .then((res) => {
        setEmployeeResume("");
        window.location.reload();
      })
      .catch((error) => {
        alert("error updating resume");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-row mt-6">
      <div>
        <EmployeeNavigation />
      </div>
      <div className="w-10/12 m-auto">
        <div className="px-20">
          <div className=" py-8 w-full">
            {loading && (
              <h5 className="font-bold text-xl text-jobBlue-700">
                wait a moment, saving your resume...
              </h5>
            )}
            <div className="flex justify-between">
              {user ? (
                <div>
                  <div className="flex flex-col mb-8">
                    <span>Name: {user.first_name}</span>
                    {user.profile_owner[0].resume ? (
                      <button
                        onClick={() =>
                          window.open(user.profile_owner[0].resume, "_blank")
                        }
                        className="hover:text-jobBlue-700 bg-blue-200 border-jobBlue-100 border-2 px-2"
                      >
                        Resume {user.profile_owner[0].resume}
                      </button>
                    ) : null}
                  </div>
                  <form onSubmit={saveResume}>
                    <input
                      className="auth-form-input"
                      type="file"
                      onChange={(e) => setEmployeeResume(e.target.files[0])}
                    />
                    <button className="bg-blue-700 px-4 py-2 font-bold text-white mt-4 rounded-md">
                      {user.profile_owner[0].resume
                        ? "Update Resume"
                        : "Add Resume"}
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { loadUserWhenAlreadyLoggedIn })(
  EmployeeProfile
);
