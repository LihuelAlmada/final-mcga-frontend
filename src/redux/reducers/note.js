import {
    FETCH_NOTE,
    ADD_NOTE_PENDING,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_ERROR,
    DELETE_NOTE_PENDING,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_ERROR,
  } from "../actions/types";
  
  const initialState = {
    notes: [],
    size: "",
    error: null,
    isLoading: false,
    message: undefined,
    noteSelected: "",
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_NOTE:
        return {
          ...state,
          notes: action.payload.notes
        };
  
      case ADD_NOTE_PENDING:
        return {
          ...state,
          isLoading: true,
        };
  
      case ADD_NOTE_SUCCESS: {
        const newStudent = action.payload.note;
        const notes = [...state.notes, newStudent];
        return {
          ...state,
          isLoading: false,
          notes: notes,
        };
      }
  
      case ADD_NOTE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.error,
          message: action.payload.message,
        };
  
      case DELETE_NOTE_PENDING:
        return {
          ...state,
          isLoading: true,
        };
  
      case DELETE_NOTE_SUCCESS:
        console.log(action.payload);
        const newNote = [...state.notes];
        const noteToDelete = newNote.findIndex(
          (ele) => ele._id === action.payload._id
        );
  
        newNote.splice(noteToDelete, 1);
        return {
          ...state,
          isLoading: false,
          notes: newNote,
        };
  
      case DELETE_NOTE_ERROR:
        return {
          ...state,
          isLoading: false,
          message: action.payload.message,
        };
  
      default:
        return state;
    }
  }
  