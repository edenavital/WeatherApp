import React, { Component } from "react";
import "./WeatherForecast.css";
import { connect } from "react-redux";
import { fetchForecastWeather } from "../../redux";

class WeatherForecast extends Component {
  componentDidMount() {}

  render() {
    console.log(
      "Hello from WeatherForecast component, my state: state.WeatherForecast: ",
      this.props.forecastDataFromApi
    );

    //You need to get 5 days from this.props.dataFromApi.list... it is 40 objects 3 hours diff... take the first one which is the current day, and than get to the next day somehow...

    return (
      <div className="WeatherForecast">
        <h3>Hello from WeatherForecast</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    forecastDataFromApi: state.weatherForecast.forecastDataFromApi
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchForecastWeather: () => dispatch(fetchForecastWeather())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);
