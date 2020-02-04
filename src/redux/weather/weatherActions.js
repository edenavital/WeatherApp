import axios from "axios";
import { fetchForecastWeather } from "../weatherForecast/WeatherForecastActions";
import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
  // TEMP_TO_FAHRENHEIT,
  // TEMP_TO_CELSIUS,
  TOGGLE_CELSIUS
} from "./weatherTypes";

export const fetchCoordinates = () => {
  return {
    type: FETCH_COORDINATES
  };
};

//When the user succeed to fetch coordinates from user:
//I dispatch feetchCoordinatesSuccess in order to return action.payload.position - which are the coordinates,
//and action.payload.dataFromApi - which is the json I get from the api
//In the Reducer, I will take care of the data I'm getting
export const fetchCoordinatesSuccess = (position, dataFromApi) => {
  return {
    type: FETCH_COORDINATES_SUCCESS,
    payload: {
      position: position,
      dataFromApi: dataFromApi
    }
  };
};

export const fetchCoordinatesFailure = () => {
  return {
    type: FETCH_COORDINATES_FAILURE,
    payload: {
      lat: "",
      long: "",
      msg: "Error - can't fetch coordinates"
    }
  };
};

//Fetching coordinates from the user
export const fetchUserCoordinates = () => {
  console.log("fetchUserCoordinates invoked");
  return dispatch => {
    dispatch(fetchCoordinates);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(
          "Coordinates: ",
          position.coords.latitude,
          position.coords.longitude
        );
        //Calling fetchFromApi with position coordinates
        dispatch(fetchFromApi(position));
      });
    } else {
      dispatch(fetchCoordinatesFailure());
    }
  };
};

export const fetchFromApi = position => {
  console.log("fetchFromApi invoked");
  return dispatch => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=992de09d4812a13bdc498d2d720b5cc6`
      )
      .then(res => {
        const dataFromApi = res.data;
        console.log("dataFromApi: ", dataFromApi);

        dispatch(fetchCoordinatesSuccess(position, dataFromApi));
        //Only after I fetched the data, I can pass it to forecastWeather
        dispatch(fetchForecastWeather());
      })
      .catch(err => {
        dispatch(fetchCoordinatesFailure());
      });
  };
};

//toggleCelsius - returns new temperature and toggles the isCelsius redux state
export const toggleCelsius = (isCelsius, temp, tempType) => {
  let newTemp = temp;
  let newTempType = tempType;
  if (isCelsius) {
    newTemp = ((temp * 9) / 5 + 32).toFixed(2);
    newTempType = "°F";
  } else {
    newTemp = ((temp - 32) / 1.8).toFixed(2);
    newTempType = "°C";
  }

  return {
    type: TOGGLE_CELSIUS,
    payload: {
      temp: newTemp,
      isCelsius: !isCelsius,
      tempType: newTempType
    }
  };
};
