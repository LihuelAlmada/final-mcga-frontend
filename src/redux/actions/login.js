import {
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    FETCH_USERS,
    ADD_USER_PENDING,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    USER_LOGOUT,
    AUTHENTICATION,
  } from "./types";
  
  //#region POST USER
  export const postUser = (user) => {
    return (dispatch) => {
      dispatch({
        type: ADD_USER_PENDING,
      });
      const request = {
        timeout: 25000,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      return fetch("http://localhost:5000/api/user/signup", request)
        .then((response) => response.json())
        .then((response) => {
          if (!Object.entries(response).length) {
            return Promise.reject(response);
          }
          return dispatch({
            type: ADD_USER_SUCCESS,
            payload: {
              user: response,
            },
          });
        })
        .catch((error) => {
          return dispatch({
            type: ADD_USER_ERROR,
            payload: error,
          });
        });
    };
  };
  //#endregion
  //#region GET USER
  export const fetchUser = () => (dispatch) => {
    fetch("http://localhost:5000/api/user/")
      .then((response) => response.json())
      .then((response) => {
        return dispatch({
          type: FETCH_USERS,
          payload: response,
        });
      });
  };
  //#endregion
  //#region LOGIN
  export const logIn = (response) => {
    return (dispatch) => {
      //Dispatch action
      dispatch({
        type: LOGIN_USER_PENDING,
      });
      const request = {
        timeout: 25000,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.getElementById("emailLogin").value,
          password: document.getElementById("passwordLogin").value,
        }),
      };
      //BackEnd Fetch
      return fetch("http://localhost:5000/api/user/login", request)
        .then((response) => response.json())
        .then((response) => {
          //In case of success on dispatch, move to reducer
          if (response.msg !== "Authentication Failed") {
            return dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: response,
            });
          } else {
            return dispatch({
              type: LOGIN_USER_ERROR,
              payload: response.error,
            });
          }
        });
    };
  };
  //#endregion
  //#region LOGOUT
  export const logOut = (dispatch) => {
    return {
      type: USER_LOGOUT,
    };
  };
  //#endregion
  //#region AUTHENTICATION
  export const Authentication = (authentication) => {
    return {
      type: AUTHENTICATION,
      payload: authentication,
    };
  };
  //#endregion