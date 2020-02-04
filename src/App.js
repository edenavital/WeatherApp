import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Weather App</h1>
        <CurrentWeather />
      </div>
    </Provider>
  );
};

export default App;
