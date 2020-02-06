import React, { Component } from "react";
import "./WeatherForecast.css";
import { connect } from "react-redux";
// import { fetchForecastWeather } from "../../redux";
import WeatherCard from "../WeatherCard/WeatherCard";
class WeatherForecast extends Component {
  render() {
    console.log(
      "Hello from WeatherForecast component, my state: state.WeatherForecast: ",
      this.props.forecastDataFromApi
    );

    //You need to get 5 days from this.props.dataFromApi.list... it is 40 objects 3 hours diff...
    //If you wish to show the current day too, just take the values from CurrentWeather state (Start off with: description, temp, icon)
    //FIGURE OUT WHY I CANT USE THE STATE FROM THE REDUCER

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
    console.log(
      "NEXT TIME IS TO LOOP OVER FIFTHDAYSDATA AND THAN SENDS THE DATA TO WEATHER CARD EACH TIME! ALMOST DONE TASK!"
    );
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
