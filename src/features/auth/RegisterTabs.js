import React from "react";

import RegisterForm from "./RegisterForm";

export default function RegisterTabs({
  color,
  setPhoneNumber,
  setUserType,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  registerUser,
  phoneNumber,
  loading,
  userType,
}) {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap mt-6 mb-10">
        <div className="w-full lg:w-6/12 md:w-6/12 xl:w-6/12 m-auto">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px ml-2 lg:ml-0 mr-2 last:mr-0 flex-auto text-center border-2 border-jobBlue-100">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg  block " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  setUserType("employee");
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Employee
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center font-bold border-2 border-jobBlue-100">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg block leading-normal" +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  setUserType("employer");
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Employer
              </a>
            </li>
          </ul>
          <h1 className="text-2xl text-center font-bold text-black">
            Registering as
            {userType === 'employee' ?
              <span className="pl-1 text-jobGreen-100 uppercase">{userType}</span> :
              <span className="pl-1 text-red-700 uppercase">{userType}</span>}
          </h1>
          <div className="flex flex-col min-w-0 break-words bg-white w-full shadow-sm ">
            <div className="px-4 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <RegisterForm
                    registerUser={registerUser}
                    onChangeFirstName={setFirstName}
                    onChangeLastName={setLastName}
                    onChangeEmail={setEmail}
                    onChangePassword={setPassword}
                    onChangeConfirmPassword={setConfirmPassword}
                    onChangePhoneNumber={setPhoneNumber}
                    phoneNumber={phoneNumber}
                    loading={loading}
                  />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <RegisterForm
                    registerUser={registerUser}
                    onChangeFirstName={setFirstName}
                    onChangeLastName={setLastName}
                    onChangeEmail={setEmail}
                    onChangePassword={setPassword}
                    onChangeConfirmPassword={setConfirmPassword}
                    onChangePhoneNumber={setPhoneNumber}
                    phoneNumber={phoneNumber}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
