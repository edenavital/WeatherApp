import React from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import { connect } from "react-redux";

const App = props => {
  console.log("FROM APP.JS: ", props.loading);

  let forecast = "";
  forecast = !props.loading
    ? (forecast = <WeatherForecast />)
    : (forecast = null);

  return (
    <div className="App">
      <h1>Weather App</h1>

      <CurrentWeather />
      {forecast}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.weatherForecast.loading
  };
};

export default connect(mapStateToProps)(App);
