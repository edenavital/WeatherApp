import axios from "axios";

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

//Sends the data (json) to the reducer
export const fetchForecastSuccess = forecastDataFromApi => {
  return {
    type: FETCH_FORECAST_SUCCESS,
    payload: forecastDataFromApi
  };
};
//Sends an error to the reducer - fetch failed
export const fetchForecastFailure = err => {
  return {
    type: FETCH_FORECAST_FAILURE,
    payload: "Error - can't fetch coordinates"
  };
};
//Action creator which is sent to the component WeatherForecast
export const fetchForecastWeather = () => {
  return (dispatch, getState) => {
    console.log("INSIDE FETCHFORECASTWEATHER");
    dispatch(fetchForecastRequest());

    const storeFromWeather = getState().weather;

    const lat = storeFromWeather.lat;
    const long = storeFromWeather.long;
    // console.log("LAT:", lat);
    // console.log("LONG:", long);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=992de09d4812a13bdc498d2d720b5cc6`
      )
      .then(res => {
        const forecastDataFromApi = res.data;
        console.log("FORECAST DATA FROM ACTION: ", forecastDataFromApi);
        //const tryin = forecastDataFromApi.list[0];
        //console.log("FROMWEATHERFORECASTACTIONS: ", tryin);
        dispatch(fetchForecastSuccess(forecastDataFromApi));
      })
      .catch(err => {
        dispatch(fetchForecastFailure());
      });
  };
};
