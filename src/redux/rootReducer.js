import { combineReducers } from "redux";

import coordinatesReducer from "./coordinates/coordinatesReducer";

const rootReducer = combineReducers({
  coordinates: coordinatesReducer
});

export default rootReducer;
