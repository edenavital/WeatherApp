import axios from "axios";
import { fetchForecastWeather } from "../weatherForecast/WeatherForecastActions";
import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
  TOGGLE_CELSIUS
} from "./weatherTypes";

//Action creator that goes to the component CurrentWeather - Fetching coordinates from the user, than gets data from the api
export const fetchUserCoordinates = () => {
  console.log("fetchUserCoordinates invoked");
  return dispatch => {
    dispatch(fetchCoordinates);

    if (navigator.geolocation) {
      let location_timeout = setTimeout(
        dispatch(fetchCoordinatesFailure()),
        3000
      );
      clearTimeout(location_timeout);
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
      console.log("LALLALALALALALALALALLALAL");
      dispatch(fetchCoordinatesFailure());
    }
  };
};

export const fetchCoordinates = () => {
  return {
    type: FETCH_COORDINATES
  };
};

//When the user succeed to fetch coordinates from the user:
//Dispatch feetchCoordinatesSuccess in order to return action.payload.position - which are the coordinates,
//and action.payload.dataFromApi - which is the data (json format) I get from the api
//In the Reducer, I can send the json or destructure only what I need

export const fetchFromApi = position => {
  console.log("fetchFromApi invoked");
  return dispatch => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const keyOfBigDataCloud = "d1c4f3621eae4ab2ad0f00bc9ec7e465";
    const keyOfWeatherApi = "992de09d4812a13bdc498d2d720b5cc6";
    let cityName = "";
    axios
      .get(
        `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${long}&localityLanguage=en&key=${keyOfBigDataCloud}`
      )
      .then(res => {
        cityName = res.data.locality;
        console.log("CityName:", cityName);

        //Now that we are exposed to cityName variable, we can use it in order to fetch data for X city
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keyOfWeatherApi}`
          )
          .then(res => {
            const dataFromApi = res.data;
            console.log("dataFromApi - CurrentWeather: ", dataFromApi);

            dispatch(fetchCoordinatesSuccess(position, dataFromApi));
            //Only after I fetched the data, I can pass the positions of the user to forecastWeather
            dispatch(fetchForecastWeather());
          })
          .catch(err => {
            dispatch(fetchCoordinatesFailure());
          });
      });
  };
};

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
    payload:
      "There was a problem with accessing your location, make sure location is activated"
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
