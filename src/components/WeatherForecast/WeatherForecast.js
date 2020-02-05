import React, { Component } from "react";
import "./WeatherForecast.css";
import { connect } from "react-redux";
// import { fetchForecastWeather } from "../../redux";
import WeatherCard from "../WeatherCard/WeatherCard";
class WeatherForecast extends Component {
  render() {
    console.log(
      "Hello from WeatherForecast component, my state: state.WeatherForecast: ",
      this.props.forecastDataFromApi.list[0]
    );

    //You need to get 5 days from this.props.dataFromApi.list... it is 40 objects 3 hours diff... take the first one which is the current day, and than get to the next day somehow...
    //If you wish to show the current day too, just take the values from CurrentWeather state (Start off with: description, temp, icon)
    //FIGURE OUT WHY I CANT USE THE STATE FROM THE REDUCER

    let forecast = this.props.forecastDataFromApi;
    console.log("FORECAST: ", forecast);

    return (
      <div className="WeatherForecast">
        <h3>Hello from WeatherForecast</h3>
        <WeatherCard />
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
    //Not dispatching it from here, since I need the coordinates from the user !
    //fetchForecastWeather: () => dispatch(fetchForecastWeather())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);
