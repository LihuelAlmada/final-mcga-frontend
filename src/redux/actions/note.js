import {
    FETCH_NOTE,
    ADD_NOTE_PENDING,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_ERROR,
    DELETE_NOTE_PENDING,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_ERROR,
  } from "./types";
  
  import store from "../store/store";
  
  //#region GET NOTE
  export const fetchNotes = () => (dispatch) => {
    fetch("http://localhost:5000/api/notes")
      .then((response) => response.json())
      .then((response) => {
        return dispatch({
          type: FETCH_NOTE,
          payload: response,
        });
      });
  };
  //#endregion
  //#region POST NOTE
  export const postNote = (note) => {
    return (dispatch) => {
      dispatch({
        type: ADD_NOTE_PENDING,
      });
      //CombineTools allow us to get the users
      const { token } = store.getState().users;
      const request = {
        timeout: 25000,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `BEARER ${token}`,
        },
        body: JSON.stringify(note),
      };
      return fetch(`http://localhost:5000/api/notes`, request)
        .then((response) => response.json())
        .then((response) => {
          if (!Object.entries(response).length) {
            return Promise.reject(response);
          }
          return dispatch({
            type: ADD_NOTE_SUCCESS,
            payload: {
              student: response.createdNote,
            },
          });
        })
        .catch((error) => {
          return dispatch({
            type: ADD_NOTE_ERROR,
            payload: error,
          });
        });
    };
  };
  //#endregion
  
  //#region DELETE NOTE
  export const deleteNote = (code) => {
    return (dispatch) => {
      dispatch({
        type: DELETE_NOTE_PENDING,
      });
      const options = {
        timeout: 25000,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      return fetch(`http://localhost:5000/api/notes/${code}`, options)
        .then((response) => response.json())
        .then((response) => {
          if (!Object.entries(response).length) {
            return Promise.reject(response);
          }
          if (response.message === "error") {
            return dispatch({
              type: DELETE_NOTE_ERROR,
            });
          } else {
            return dispatch({
              type: DELETE_NOTE_SUCCESS,
              payload: response,
            });
          }
        })
        .catch((error) => {
          return dispatch({
            type: DELETE_NOTE_ERROR,
            payload: error,
          });
        });
    };
  };
  //#endregion
  