import * as React from "react";
import axios from "axios";

import { appTokenConfig } from "../../helperfuncs/token";
import { getLoggedInToken } from "../../helperfuncs/getToken";

export default function Applications() {
  React.useEffect(() => {
    async function getUserApplications() {
      const loggedInToken = await getLoggedInToken();
      axios
        .get(
          "http://localhost:8000/joblisting/userapplications/",
          appTokenConfig(loggedInToken)
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUserApplications();
  }, []);

  return <div>Applications</div>;
}
