import React from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import { connect } from "react-redux";

const App = props => {
  console.log("FROM APP.JS: ", props.loading);

  let forecast = "";
  if (!props.loading) {
    forecast = <WeatherForecast />;
  } else {
    console.log("FROM APP.JS: ", props.loading);
    forecast = null;
  }

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

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
