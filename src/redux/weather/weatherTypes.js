/*
fetchUserCoordinates - The function that the user gets in order to run all the actions - calls FETCH_COORDINATES

FETCH_COORDINATES - gets called once the application starts - Initial the state... it is usually used for loader
FETCH_FROM_API - Fetch request to the API (if we get a resolved promise, we will dispatch FETCH_COORDINATES_SUCCESS, else, FETCH_COORDINATES_FAILURE)
FETCH_COORDINATES_SUCCESS - Once the request has been made, and we got the data from the api,
I dispatch this action and it gets 2 parameters: position of the user and the data from the api - it sends them to the reducer
FETCH_COORDINATES_FAILURE - If the request has been failed, the FETCH_COORDINATES_FAILURE sends error message to the reducer, it is not from the request, it is manual error message
TOGGLE_CELSIUS - Toggles the temperature - it changes the states: temp(values), tempType(C/F), isCelsius(boolean)
*/

export const FETCH_COORDINATES = "FETCH_COORDINATES";
export const FETCH_COORDINATES_SUCCESS = "FETCH_COORDINATES_SUCCESS";
export const FETCH_COORDINATES_FAILURE = "FETCH_COORDINATES_FAILURE";
export const FETCH_FROM_API = "FETCH_FROM_API";
export const TOGGLE_CELSIUS = "TOGGLE_CELSIUS";
