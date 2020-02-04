import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
  // TEMP_TO_FAHRENHEIT,
  // TEMP_TO_CELSIUS,
  TOGGLE_CELSIUS
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
        long: action.payload.position.coords.latitude,
        lat: action.payload.position.coords.longitude,
        name: action.payload.dataFromApi.name,
        country: action.payload.dataFromApi.sys.country,
        description: action.payload.dataFromApi.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${action.payload.dataFromApi.weather[0].icon}@2x.png`,
        isCelsius: true,
        temp: action.payload.dataFromApi.main.temp,
        tempType: "°C",
        error: ""
      };
    case FETCH_COORDINATES_FAILURE:
      return {
        long: "",
        lat: "",
        error: "Failed to fetch coordinates from user"
      };
    case TOGGLE_CELSIUS:
      return {
        ...state,
        temp: action.payload.temp,
        isCelsius: action.payload.isCelsius,
        tempType: action.payload.tempType
      };
    default:
      return state;
  }
};

export default weatherReducer;
