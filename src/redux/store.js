import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import weatherReducer from "./weather/weatherReducer";

const store = createStore(
  weatherReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
