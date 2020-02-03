import React, { Component } from "react";
import "./CurrentWeather.css";
import { connect } from "react-redux";
import { fetchUserCoordinates } from "../../redux";

//props: long, lat, fetchUserCoordinates

class CurrentWeather extends Component {
  componentDidMount() {
    this.props.fetchUserCoordinates();
  }

  render() {
    return (
      <div className="CurrentWeather">
        From Weather at "LOCATION" is:
        <p>Country, City</p>
        <p>FETCH DAY AND TIME</p>
        <p>STATUS OF SKY</p>
        <p>
          Long: {this.props.long} Lat: {this.props.lat}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    long: state.coordinates.long,
    lat: state.coordinates.lat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCoordinates: () => dispatch(fetchUserCoordinates())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
