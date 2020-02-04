import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
  TEMP_TO_FAHRENHEIT,
  TEMP_TO_CELSIUS,
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
    case TEMP_TO_FAHRENHEIT:
      return {
        ...state,
        temp: action.payload,
        tempType: "°F"
      };
    case TEMP_TO_CELSIUS:
      return {
        ...state,
        temp: action.payload,
        tempType: "°C"
      };
    case TOGGLE_CELSIUS:
      return {
        ...state,
        isCelsius: !action.payload
      };
    default:
      return state;
  }
};

export default weatherReducer;
