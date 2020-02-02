import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserCoordinates } from "../../redux";

class CurrentWeather extends Component {
  componentDidMount() {
    this.props.fetchUserCoordinates();
  }

  render() {
    return (
      <div>
        Hello from currentWeather
        <p>Your current position is :</p>
        <p>
          Long: {this.props.long} Lat: {this.props.long}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    long: state.long,
    lat: state.lat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCoordinates: () => dispatch(fetchUserCoordinates())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
