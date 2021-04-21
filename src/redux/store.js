import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware))
);
