import * as React from "react";
import DashboardNavigation from "./DashboardNavigation";
import { connect } from "react-redux";

function EmployerProfile({ authState }) {
  const { user } = authState;
  return (
    <div className="flex flex-row mt-6">
      <div className="sticky left-0 w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-10/12">
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
export default connect(mapStateToProps, null)(EmployerProfile);
