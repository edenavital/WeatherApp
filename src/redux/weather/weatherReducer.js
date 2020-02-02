import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE
} from "./weatherTypes";

const initialState = {
  long: "",
  lat: "",
  error: ""
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COORDINATES:
      return {
        long: "",
        lat: "",
        error: ""
      };
    case FETCH_COORDINATES_SUCCESS:
      return {
        long: action.payload.long,
        lat: action.payload.lat,
        error: ""
      };
    case FETCH_COORDINATES_FAILURE:
      return {
        long: "",
        lat: "",
        error: "Failed to fetch coordinates from user"
      };
    default:
      return state;
  }
};

export default weatherReducer;
