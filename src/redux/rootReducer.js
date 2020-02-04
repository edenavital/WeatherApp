import { combineReducers } from "redux";

import weatherReducer from "./weather/weatherReducer";
import weatherForecastReducer from "./weatherForecast/WeatherForecastReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  weatherForecast: weatherForecastReducer
});

export default rootReducer;
