import React, { Component } from "react";
import "./WeatherForecast.css";
import { connect } from "react-redux";
import WeatherCard from "../WeatherCard/WeatherCard";
import Graph from "../Graph/Graph";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getCurrentDay = dt_txt => {
  const date = new Date(dt_txt);
  return DAYS[date.getDay()];
};

let graphData = [];

class WeatherForecast extends Component {
  render() {
    console.log(
      "Hello from WeatherForecast component, my state: state.WeatherForecast: ",
      this.props.forecastDataFromApi
    );

    //I want to display the weather according to the current time.
    //So I take only the objects that represents the current time.
    //Extracting the current time according to the API (09:00:00)
    const currentFitTime = this.props.forecastDataFromApi.list[0].dt_txt.slice(
      -8
    );
    console.log("CURRENT FIT TIME IS: ", currentFitTime);

    //Looping on the weather objects, and filtering - returning only objects that have the current time
    const fifthDaysData = this.props.forecastDataFromApi.list.filter(
      forecast => {
        const timeOfObject = forecast.dt_txt.slice(-8);
        if (currentFitTime === timeOfObject) {
          return true;
        }

        return false;
      }
    );

    console.log("I'M LEFT WITH: ", fifthDaysData);

    let animationDelay = 3.5;

    let forecast = fifthDaysData.map(weatherPerDay => {
      const currentDayString = getCurrentDay(weatherPerDay.dt_txt);
      animationDelay += 0.8;

      const dataToGraphPerDay = {
        name: currentDayString,
        temperature: weatherPerDay.main.temp
      };
      graphData.push(dataToGraphPerDay);

      return (
        <WeatherCard
          key={weatherPerDay.dt}
          description={weatherPerDay.weather[0].description}
          icon={`http://openweathermap.org/img/wn/${weatherPerDay.weather[0].icon}.png`}
          temp={weatherPerDay.main.temp}
          currentDayString={currentDayString}
          animationDelay={animationDelay}
        />
      );
    });

    return (
      <div className="WeatherForecast">
        <h2>Weather Forecast for the next 5 days</h2>
        <main>{forecast}</main>

        <Graph graphData={graphData} />
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
