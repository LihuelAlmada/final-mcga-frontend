import {
  ADD_USER_PENDING,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  FETCH_USERS,
  AUTHENTICATION,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  USER_LOGOUT,
} from "../actions/types";

const initialState = {
  authentication: false,
  users: [],
  error: null,
  isLoading: false,
  message: undefined,
  logged: false,
  token: "",
  failedLogin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...state,
        authentication: action.payload.authentication,
        token: action.payload.token,
      };
    case USER_LOGOUT:
      return {
        state: initialState,
      };
    case LOGIN_USER_PENDING:
      return {
        //Create a copy from the state
        ...state,
        isLoading: true,
        failedLogin: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //Get the token from the backend
        token: action.payload.token,
        authentication: true,
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        failedLogin: true,
      };

    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_USER_SUCCESS: {
      const newUser = action.payload.user;
      const user = [...state.users, newUser];
      return {
        ...state,
        isLoading: false,
        users: user,
      };
    }
    case ADD_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        message: action.payload.message,
      };
    default:
      return state;
  }
}