import * as React from "react";
import { connect } from "react-redux";

import DashboardNavigation from "./DashboardNavigation";
import Label from "../../components/Label";

function EmployerProfile({ authState }) {
  const { user } = authState;
  return (
    <div className="flex flex-col lg:flex-row mt-6">
      <div className="sticky left-0 lg:w-2/12">
        <DashboardNavigation />
      </div>
      <div className="w-full lg:w-10/12">
        <div className="px-20">
          <div className=" py-8 w-full">
            <div className="flex justify-between">
              {user ? (
                <React.Fragment>
                  <div>
                    <div>
                      <Label label="Name" />
                      <h1 className="font-bold text-2xl capitalize">
                        {user.first_name} {user.last_name}
                      </h1>
                    </div>
                  </div>
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
