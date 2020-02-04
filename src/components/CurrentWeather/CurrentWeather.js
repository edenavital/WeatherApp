import React, { Component } from "react";
import "./CurrentWeather.css";
import { connect } from "react-redux";
import {
  fetchUserCoordinates,
  tempToFahrenheit,
  tempToCelsius,
  toggleCelsius
} from "../../redux";

//props: long, lat, fetchUserCoordinates()
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
  "December"
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const generateDateFormat = () => {
  let dateFormat = "";
  let date = new Date();
  dateFormat = `${DAYS[date.getDay()]}, ${date.getDay()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;
  return dateFormat;
};

class CurrentWeather extends Component {
  componentDidMount() {
    this.props.fetchUserCoordinates();
  }

  toggleTemp = () => {
    const temp = this.props.temp;
    const isCelsius = this.props.isCelsius;

    if (this.props.isCelsius) {
      this.props.tempToFahrenheit(temp);
      this.props.toggleCelsius(isCelsius);
    } else {
      this.props.tempToCelsius(temp);
      this.props.toggleCelsius(isCelsius);
      //toggle isCelsius!
    }
  };

  render() {
    const dateFormat = generateDateFormat();
    console.log("TEMP IS: ", this.props.temp);
    return (
      <div className="CurrentWeather">
        <div className="weather-summary">
          <h2>
            {this.props.name}, {this.props.country}
          </h2>
          <h4>{dateFormat}</h4>
          <h4>{this.props.description}</h4>
          <div>
            <img src={this.props.icon} alt="weatherIcon" />
            <h3>
              {this.props.temp}{" "}
              <span onClick={this.toggleTemp}>{this.props.tempType}</span>
            </h3>
          </div>

          <h4>TEMPERATURE WITH C AND F OPTIONS</h4>
          <em>
            Your current position is: Long: {this.props.long} Lat:{" "}
            {this.props.lat}
          </em>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    long: state.weather.long,
    lat: state.weather.lat,
    name: state.weather.name,
    country: state.weather.country,
    description: state.weather.description,
    icon: state.weather.icon,
    isCelsius: state.weather.isCelsius,
    temp: state.weather.temp,
    tempType: state.weather.tempType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCoordinates: () => dispatch(fetchUserCoordinates()),
    tempToFahrenheit: temp => dispatch(tempToFahrenheit(temp)),
    tempToCelsius: temp => dispatch(tempToCelsius(temp)),
    toggleCelsius: isCelsius => dispatch(toggleCelsius(isCelsius))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
