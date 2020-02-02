import {
  FETCH_COORDINATES,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE
} from "./weatherTypes";

export const fetchCoordinates = () => {
  return {
    type: FETCH_COORDINATES
  };
};

export const fetchCoordinatesSuccess = position => {
  return {
    type: FETCH_COORDINATES_SUCCESS,
    payload: {
      lat: position.coords.latitude,
      long: position.coords.longitude
    }
  };
};

export const fetchCoordinatesFailure = () => {
  return {
    type: FETCH_COORDINATES_FAILURE,
    payload: {
      msg: "Error on fetching coordinates"
    }
  };
};

export const fetchUserCoordinates = () => {
  console.log("fetchUserCoordinates invoked");
  return dispatch => {
    dispatch(fetchCoordinates);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(
          "Coordinates: ",
          position.coords.latitude,
          position.coords.longitude
        );
        dispatch(fetchCoordinatesSuccess(position));
      });
    } else {
      dispatch(fetchCoordinatesFailure);
    }
  };
};
