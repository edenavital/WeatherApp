import {
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE
} from "./WeatherForecastTypes";

const initialState = {
  test: "test"
};

const weatherForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORECAST_SUCCESS:
      return {
        dataFromApi: action.payload
      };
    case FETCH_FORECAST_FAILURE:
      return {
        ...state,
        msg: action.payload
      };
    default:
      return state;
  }
};

export default weatherForecastReducer;
