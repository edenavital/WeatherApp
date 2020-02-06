import React from "react";
import "./WeatherCard.css";

//Will be needed in order to show the forecast of 5 days, WeatherCard is a component for a single day
function WeatherCard(props) {
  return (
    <div
      className="WeatherCard"
      style={{
        animation: `FadeInWeatherCard 1s ${props.animationDelay}s forwards`
      }}
    >
      <h3>{props.currentDayString}</h3>
      <h4>{props.description}</h4>
      <img src={props.icon} alt="iconOfWeather" />
      <p>{props.temp}</p>
    </div>
  );
}

export default WeatherCard;
