import * as React from "react";
import DateTimePicker from "react-datetime-picker";
import { useAlert } from "react-alert";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "react-loader-spinner";
import "react-quill/dist/quill.snow.css";

import DashboardNavigation from "./DashboardNavigation";
import { axiosInstance } from "../../services/axios";

function AddJob() {
  const [deadlineDate, setDeadlineDate] = React.useState(new Date());
  const [category, setCategory] = React.useState(0);
  const [jobCategories, setJobCategories] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [tagOne, setTagOne] = React.useState("");
  const [tagTwo, setTagTwo] = React.useState("");
  const [tagThree, setTagThree] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [employmentStatus, onEmploymentStatus] = React.useState("");
  const [minSalary, setMinSalary] = React.useState(0);
  const [maxSalary, setMaxSalary] = React.useState(0);
  const [currency, setCurrency] = React.useState("");
  const [vaccancies, setVaccancies] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [experienceStatus, setExperienceStatus] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [companyLocation, setCompanyLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [companyLogo, setCompanyLogo] = React.useState("");
  const [workDuration, setWorkDuration] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const alert = useAlert();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
      ["video"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
  ];

  React.useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get(`/joblisting/categories/`)
      .then((res) => {
        if (isMounted) {
          setJobCategories(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        errorAlert("error getting job categories, try again later");
      });
    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function errorAlert(reason) {
    alert.error(reason);
  }

  const onAddJob = async (e) => {
    e.preventDefault();

    if (!category) {
      errorAlert("Add job category!");
      return;
    }

    if (!title) {
      errorAlert("Add job title!");
      return;
    }

    if (!deadlineDate) {
      errorAlert("Add job deadline!");
      return;
    }

    if (!gender) {
      errorAlert("Add job gender!");
      return;
    }

    if (!employmentStatus) {
      errorAlert("Add employment status!");
      return;
    }

    if (!minSalary) {
      errorAlert("Add job minimum salary!");
      return;
    }

    if (!maxSalary) {
      errorAlert("Add job maximum salary!");
      return;
    }

    if (!currency) {
      errorAlert("Add slary currency!");
      return;
    }

    if (!vaccancies) {
      errorAlert("Add job vaccancies!");
      return;
    }

    if (!experience) {
      errorAlert("Add job experience!");
      return;
    }

    if (!employmentStatus) {
      errorAlert("Add employment status!");
      return;
    }

    if (!companyLocation) {
      errorAlert("Add company location!");
      return;
    }

    if (!companyLocation) {
      errorAlert("Add company location!");
      return;
    }

    if (!companyLogo) {
      errorAlert("Select company logo please!");
      return;
    }

    if (companyLogo.size > 2000000) {
      errorAlert("file size too large!, should be 2MB or less");
      return;
    }
    if (!companyLogo.name.match(/\.(jpg|jpeg|png)$/)) {
      errorAlert("wrong file format (png, jpeg, jpg)!");
      return;
    }

    if (!description) {
      errorAlert("Add job description!");
      return;
    }

    setLoading(true);

    const addJobFormData = new FormData();
    if (workDuration) {
      addJobFormData.append("work_duration", workDuration);
    }
    addJobFormData.append("category", category);
    addJobFormData.append("title", title);
    addJobFormData.append(
      "dateline",
      moment(deadlineDate).format("YYYY-MM-DD")
    );
    addJobFormData.append("tag_one", tagOne);
    addJobFormData.append("tag_two", tagTwo);
    addJobFormData.append("tag_three", tagThree);
    addJobFormData.append("gender", gender);
    addJobFormData.append("employment_status", employmentStatus);
    addJobFormData.append("salary_range_from", minSalary);
    addJobFormData.append("salary_range_to", maxSalary);
    addJobFormData.append("salary_currency", currency);
    addJobFormData.append("vacancies", vaccancies);
    addJobFormData.append("experience", experience);
    addJobFormData.append("experience_status", experienceStatus);
    addJobFormData.append("company_name", companyName);
    addJobFormData.append("company_location", companyLocation);
    addJobFormData.append("company_logo", companyLogo, companyLogo.name);
    addJobFormData.append("description", description);

    axiosInstance
      .post(`/joblisting/create/`, addJobFormData)
      .then(() => {
        alert.show("job successful added!");
        setLoading(false);
      })
      .catch(() => {
        alert.error("failed to add job, try again later!");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-row mt-6">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
        <form onSubmit={onAddJob} className="flex flex-col w-11/12 m-auto">
          <div className="flex flex-row justify-around">
            {loading ? (
              <div className="flex mt-8 w-5/12">
                <Loader
                  type="TailSpin"
                  color="#1da1f2"
                  height={30}
                  width={30}
                  timeout={50000}
                />
                <span className="pl-2">wait still loading category ...</span>
              </div>
            ) : (
              <div className="flex flex-col mt-6 w-5/12">
                <label>Category:</label>
                <select
                  className="auth-form-input"
                  defaultValue="Select job category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Select job category" disabled>
                    Select job category
                  </option>
                  {jobCategories.map((jobCat) => (
                    <React.Fragment key={jobCat.id}>
                      <option value={jobCat.id}>{jobCat.name}</option>
                    </React.Fragment>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col mt-6 w-5/12">
              <label>Title:</label>
              <input
                className="auth-form-input"
                placeholder="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Deadline:</label>
              <DateTimePicker
                className="p-4"
                disableClock={true}
                value={deadlineDate}
                onChange={setDeadlineDate}
              />
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Tag one:</label>
              <input
                className="auth-form-input"
                placeholder="tag one"
                type="text"
                onChange={(e) => setTagOne(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Tag two:</label>
              <input
                className="auth-form-input"
                placeholder="tag two"
                type="text"
                onChange={(e) => setTagTwo(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Tag three:</label>
              <input
                className="auth-form-input"
                placeholder="tag three"
                type="text"
                onChange={(e) => setTagThree(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Gender:</label>
              <select
                className="auth-form-input"
                defaultValue="Select gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Select gender" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
              </select>
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Employment status:</label>
              <select
                className="auth-form-input"
                defaultValue="Select employment status"
                onChange={(e) => onEmploymentStatus(e.target.value)}
              >
                <option value="Select employment status" disabled>
                  Select employment status
                </option>
                <option value="Part Time">Full Time</option>
                <option value="Full Time">Part Time</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Min salary:</label>
              <input
                className="auth-form-input"
                placeholder="minimum salary"
                type="number"
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Max salary:</label>
              <input
                className="auth-form-input"
                placeholder="maximum salary"
                type="number"
                onChange={(e) => setMaxSalary(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Salary Currency:</label>
              <select
                className="auth-form-input"
                defaultValue="Salary currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="Salary currency" disabled>
                  Salary currency
                </option>
                <option value="Ugx">Ugandan Shillings</option>
                <option value="$">Dollars</option>
              </select>
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Number of Vacancies:</label>
              <input
                className="auth-form-input"
                placeholder="number of vacancies"
                type="number"
                onChange={(e) => setVaccancies(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Number of Experience:</label>
              <input
                className="auth-form-input"
                placeholder="number of experience"
                type="number"
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Experience status:</label>
              <select
                className="auth-form-input"
                defaultValue="Experience status"
                onChange={(e) => setExperienceStatus(e.target.value)}
              >
                <option value="Experience status" disabled>
                  Experience status
                </option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-5/12">
              <label>Company name:</label>
              <input
                className="auth-form-input"
                placeholder="company name"
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-6 w-5/12">
              <label>Company location:</label>
              <input
                className="auth-form-input"
                placeholder="company location"
                type="text"
                onChange={(e) => setCompanyLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-11/12">
              <label>Work Duration (optional):</label>
              <input
                className="auth-form-input"
                type="text"
                placeholder="e.g 2 years"
                onChange={(e) => setWorkDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-11/12">
              <label>Company Logo (must be 2MB or less):</label>
              <input
                className="auth-form-input"
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col mt-6 w-11/12">
              <label>Description:</label>
              <ReactQuill
                className="bg-white"
                placeholder="Type something here ..."
                modules={modules}
                formats={formats}
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col my-6 w-11/12">
              <button className="mt-6 auth-button" type="submit">
                {loading ? "saving job .........." : "Add Job"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.AuthReducer,
});
export default connect(mapStateToProps, null)(AddJob);
