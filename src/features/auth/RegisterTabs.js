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
}) {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 md:w-6/12 xl:w-6/12 m-auto">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-sm block leading-normal " +
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
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-sm block leading-normal " +
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