import React, { Component } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import { connect } from "react-redux";
import Loader from "./components/Loader/Loader";
import { fetchUserCoordinates } from "./redux";
class App extends Component {
  componentDidMount() {
    this.props.fetchUserCoordinates();
  }

  render() {
    let forecast = "";
    forecast = !this.props.loading
      ? (forecast = <WeatherForecast />)
      : (forecast = null);

    let app = "";
    app = (
      <div className="Loading">
        <h1>Trying to access your location ...</h1>
        <Loader />
      </div>
    );

    if (!this.props.loadingApp) {
      app = (
        <>
          <h1>Weather App</h1>
          <CurrentWeather />
          {forecast}
        </>
      );
    }

    return <div className="App">{app}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.weatherForecast.loading,
    loadingApp: state.weather.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUserCoordinates: () => dispatch(fetchUserCoordinates())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
