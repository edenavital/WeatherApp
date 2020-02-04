import {
  FETCH_FORECAST_REQUEST,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE
} from "./WeatherForecastTypes";

export const fetchForecastRequest = () => {
  return {
    type: FETCH_FORECAST_REQUEST
  };
};

export const fetchForecastSuccess = () => {
  return {
    type: FETCH_FORECAST_SUCCESS,
    payload: action.payload
  };
};

export const fetchForecastFailure = err => {
  return {
    type: FETCH_FORECAST_SUCCESS,
    payload: action.payload
  };
};

export const fetchForecastWeather = () => {
  return;
};
