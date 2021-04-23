import * as React from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";

import EmployeeNavigation from "./EmployeeNavigation";
import Label from "../../components/Label";
import { axiosInstance } from "../../services/axios";

function EmployeeProfile({ authState }) {
  const [employeeResume, setEmployeeResume] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { user } = authState;
  const alert = useAlert();

  const saveResume = async (e) => {
    e.preventDefault();

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

    axiosInstance
      .patch(`/auth/profile/update/${user.id}/`, updateProfileFormData)
      .then(() => {
        setEmployeeResume("");
        window.location.reload();
      })
      .catch(() => {
        alert("error updating resume");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row mt-6">
      <div>
        <EmployeeNavigation />
      </div>
      <div className="w-full lg:w-10/12 m-auto">
        <div className="px-4 lg:px-20">
          <div className=" py-8 w-full">
            {loading && (
              <h5 className="font-bold text-xl text-jobBlue-700">
                wait a moment, saving your resume...
              </h5>
            )}
            <div className="flex justify-between">
              {user ? (
                <div>
                  <div className="flex flex-col mb-2">
                    <div>
                      <Label label="Name" />
                      <h1 className="font-bold text-2xl capitalize">
                        {user.first_name} {user.last_name}
                      </h1>
                    </div>
                    <Label label="Resume" />
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
                      accept="application/pdf"
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
export default connect(mapStateToProps, null)(EmployeeProfile);
