import {
  FETCH_FORECAST_REQUEST,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE
} from "./WeatherForecastTypes";

const initialState = {
  loading: true
};

const weatherForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORECAST_REQUEST:
      return {
        loading: true
      };
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        forecastDataFromApi: action.payload
      };
    case FETCH_FORECAST_FAILURE:
      return {
        ...state,
        loading: false,
        msg: action.payload
      };
    default:
      return state;
  }
};

export default weatherForecastReducer;
