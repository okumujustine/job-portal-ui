import * as React from "react";
import EmployeeNavigation from "./EmployeeNavigation";
import { connect } from "react-redux";

function EmployeeProfile({ authState }) {
  const { user } = authState;
  return (
    <div className="flex flex-row mt-6">
      <div>
        <EmployeeNavigation />
      </div>
      <div className="w-10/12 m-auto">
        <div className="px-20">
          <div className=" py-8 w-full">
            <div className="flex justify-between">
              {user ? (
                <React.Fragment>
                  <span>Name: {user.first_name}</span>
                </React.Fragment>
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
