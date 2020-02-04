import React from "react";
import "./WeatherCard.css";

//Will be needed in order to show the forecast of 5 days, WeatherCard is a component for a single day
function WeatherCard() {
  return (
    <div className="WeatherCard">
      <h4>DESCRIPTION</h4>
      <img src={`http://openweathermap.org/img/wn/10n.png`} alt="TEST" />
      <p>TEMPERATURE</p>
    </div>
  );
}

export default WeatherCard;
