import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
  TOGGLE_CELSIUS,
} from "./weatherTypes";

const initialState = {
  loading: true,
  long: "",
  lat: "",
  error: "",
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COORDINATES:
      return {
        long: "",
        lat: "",
        error: "",
      };
    case FETCH_COORDINATES_SUCCESS:
      return {
        long: action.payload.position.coords.latitude,
        lat: action.payload.position.coords.longitude,
        name: action.payload.dataFromApi.name,
        country: action.payload.dataFromApi.sys.country,
        description: action.payload.dataFromApi.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${action.payload.dataFromApi.weather[0].icon}@2x.png`,
        isCelsius: true,
        temp: action.payload.dataFromApi.main.temp,
        tempType: "°C",
        cityName: action.payload.dataFromApi.name,
        loading: false,
        error: "",
      };
    case FETCH_COORDINATES_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case TOGGLE_CELSIUS:
      return {
        ...state,
        temp: action.payload.temp,
        isCelsius: action.payload.isCelsius,
        tempType: action.payload.tempType,
      };
    default:
      return state;
  }
};

export default weatherReducer;
