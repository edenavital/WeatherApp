import React, { Component } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import { connect } from "react-redux";
import Loader from "./components/Loader/Loader";
import { fetchUserCoordinates } from "./redux";
class App extends Component {
  async componentDidMount() {
    await this.props.fetchUserCoordinates();
  }

  renderLoadingState = () => {
    return (
      <div className="Loading">
        <h1>Trying to access your location ...</h1>
        <Loader />
      </div>
    );
  };

  renderErrorState = () => {
    const { error } = this.props;
    return (
      <div className="Loading">
        <h1>{error}</h1>
      </div>
    );
  };

  renderContent = () => {
    return (
      <>
        <h1>Weather App</h1>
        <CurrentWeather />
        <WeatherForecast />
      </>
    );
  };

  render() {
    const { error, loading } = this.props;
    return (
      <div className="App">
        {error && error.length > 0
          ? this.renderErrorState()
          : loading
          ? this.renderLoadingState()
          : this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.weatherForecast.loading,
    loadingApp: state.weather.loading,
    error: state.weather.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserCoordinates: () => dispatch(fetchUserCoordinates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
