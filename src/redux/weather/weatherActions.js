import axios from "axios";

import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
  TEMP_TO_FAHRENHEIT,
  TEMP_TO_CELSIUS,
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
      dispatch(fetchCoordinatesFailure);
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
      })
      .catch(err => {
        dispatch(fetchCoordinatesFailure);
      });
  };
};

//Convert to Fahrenheit - payload is updated
export const tempToFahrenheit = temp => {
  return {
    type: TEMP_TO_FAHRENHEIT,
    payload: ((temp * 9) / 5 + 32).toFixed(2)
  };
};

//Convert to Celsius - payload is updated
export const tempToCelsius = temp => {
  return {
    type: TEMP_TO_CELSIUS,
    payload: ((temp - 32) / 1.8).toFixed(2)
  };
};

export const toggleCelsius = isCelsius => {
  return {
    type: TOGGLE_CELSIUS,
    payload: isCelsius
  };
};
