import { combineReducers } from "redux";
import loginReducer from "./login";
import productReducer from "./note";

//Combine the reducers
export default combineReducers({
  users: loginReducer,
  notes: productReducer,
});
