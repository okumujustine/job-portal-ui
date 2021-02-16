import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { useAlert } from "react-alert";
import { baseUrl } from "../common/constants";

import { getLoggedInToken } from "../../helperfuncs/getToken";
import { appTokenConfig } from "../../helperfuncs/token";
import { loadUserWhenAlreadyLoggedIn } from "../../redux/actions/auth/AuthAction";
import { Link } from "react-router-dom";

function Modal({
  showModal,
  setShowModal,
  job,
  authState,
  loadUserWhenAlreadyLoggedIn,
}) {
  const [resume, setResume] = React.useState("");
  const [applyMethod, setApplyMethod] = React.useState("easy");
  const [applied, setApplied] = React.useState(false);
  const { user } = authState;

  const alert = useAlert();

  React.useEffect(() => {
    if (user && !_.isEmpty(job)) {
      axios
        .post(`${baseUrl}/joblisting/userapplied/`, {
          job: job.id,
          applicant: user.id,
        })
        .then((res) => {
          if (res.data.length > 0) {
            setApplied(true);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          return;
        });
    }
  }, [user, job]);

  const sendApplication = async () => {
    await loadUserWhenAlreadyLoggedIn();
    const loggedInToken = await getLoggedInToken();
    if (!loggedInToken) {
      alert.error("log in please!");
      return;
    }

    if (!resume && applyMethod === "hard") {
      alert.error("select a resume please!");
      return;
    }

    if (user && !user.profile_owner[0].resume && applyMethod === "easy") {
      alert.error("add a resume in your profile please!");
      return;
    }

    const applyFormData = new FormData();

    if (user && user.profile_owner[0].resume && applyMethod === "easy") {
      applyFormData.append("profile_resume", user.profile_owner[0].resume);
    }

    if (resume && applyMethod === "hard" && resume.size > 2000000) {
      alert.error("file size too large!, should be 2MB or less");
      return;
    }
    if (
      resume &&
      applyMethod === "hard" &&
      !resume.name.match(/\.(docx|pdf|doc)$/)
    ) {
      alert.error("wrong file format use (pdf, docx)!");
      return;
    }

    if (resume && applyMethod === "hard") {
      applyFormData.append("resume_file", resume, resume.name);
    }

    applyFormData.append("first_name", user.first_name);
    applyFormData.append("last_name", user.last_name);
    applyFormData.append("email", user.email);
    applyFormData.append("applicant", user.id);
    applyFormData.append("job", job.id);

    axios
      .post(
        `${baseUrl}/joblisting/apply/`,
        applyFormData,
        appTokenConfig(loggedInToken)
      )
      .then(() => {
        setShowModal(false);
        setResume("");
        alert.show("application successful!");
      })
      .catch(() => alert.error("application failed, try again later!"));
  };

  const onApplyMethod = (e) => {
    setApplyMethod(e.target.value);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold capitalize">
                    {job.title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className="w-64 mb-6 md:mb-2 xl:mb-2 pl-6">
                        <label className="font-bold">First Name:</label>
                        <p>{user.first_name}</p>
                      </div>
                      <div className="w-64 mb-6 lg:mb-2 md:mb-2 xl:mb-2">
                        <label className="font-bold">Last Name: </label>
                        <p>{user.last_name}</p>
                      </div>
                      <div className="w-64 mb-6 md:mb-2 xl:mb-2">
                        <label className="font-bold">User Email: </label>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    {user.role === "employee" ? (
                      <div className="mt-6 px-3 ">
                        <input
                          type="radio"
                          checked={applyMethod === "easy"}
                          onChange={onApplyMethod}
                          value="easy"
                          name="apply"
                        />
                        Easy Apply
                        <input
                          type="radio"
                          value="hard"
                          checked={applyMethod === "hard"}
                          onChange={onApplyMethod}
                          className="ml-5"
                          name="apply"
                        />
                        Use New Resume
                      </div>
                    ) : null}
                    <div>
                      {applyMethod === "hard" ? (
                        <input
                          className="mt-4"
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => setResume(e.target.files[0])}
                        />
                      ) : (
                        <div className="mt-4">
                          {user &&
                          !user.profile_owner[0].resume &&
                          user.role === "employee" ? (
                            <Link
                              to="/employee-profile"
                              className="bg-jobBlue-800 py-2 px-3 rounded-md shadow-md text-white"
                            >
                              Add a Resume to your profile
                            </Link>
                          ) : null}

                          {(user && user.role === "employer") ||
                          user.role === "admin" ? (
                            <h5 className="text-red-700">
                              Employer application comming soon
                            </h5>
                          ) : null}

                          {user && user.profile_owner[0].resume ? (
                            <span className="py-2 px-3 bg-blue-200 border-2 border-blue-700 text-blue-700">
                              We shall use your profile resume to apply for this
                              job
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                    {applied && (
                      <small className="pt-3 text-red-500">
                        <b>
                          <i>NB:"You applied for this job before"</i>
                        </b>
                      </small>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {user.role === "employee" ? (
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => sendApplication()}
                    >
                      Apply
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, { loadUserWhenAlreadyLoggedIn })(Modal);
