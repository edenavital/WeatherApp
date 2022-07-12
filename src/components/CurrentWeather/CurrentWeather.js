import React, { Component } from "react";
import "./CurrentWeather.css";
import { connect } from "react-redux";
import { toggleCelsius } from "../../redux";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const generateDateFormat = () => {
  let dateFormat = "";
  let date = new Date();

  dateFormat = `${DAYS[date.getDay()]}, ${date.getUTCDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
  return dateFormat;
};

class CurrentWeather extends Component {
  render() {
    const dateFormat = generateDateFormat();

    return (
      <div className="CurrentWeather">
        <div className="weather-summary">
          <h2>
            {this.props.name}, {this.props.country}
          </h2>
          <h4>{dateFormat}</h4>
          <h4>{this.props.description}</h4>
          <main>
            <img src={this.props.icon} alt="weatherIcon" />
            <h3>
              {this.props.temp}{" "}
              <span
                onClick={() =>
                  this.props.toggleCelsius(
                    this.props.isCelsius,
                    this.props.temp,
                    this.props.tempType
                  )
                }
              >
                {this.props.tempType}
              </span>
            </h3>
          </main>

          <em>
            Your current position is: Long:{" "}
            {parseFloat(this.props.long).toFixed(2)} Lat:{" "}
            {parseFloat(this.props.lat).toFixed(2)}
          </em>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //Coordinates of user
    long: state.weather.long,
    lat: state.weather.lat,

    //Store & API data
    name: state.weather.name,
    country: state.weather.country,
    description: state.weather.description,
    icon: state.weather.icon,
    isCelsius: state.weather.isCelsius,
    temp: state.weather.temp,
    tempType: state.weather.tempType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCelsius: (isCelsius, temp, tempType) =>
      dispatch(toggleCelsius(isCelsius, temp, tempType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
