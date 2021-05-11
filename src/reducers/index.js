import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  // redux form requires form as a reducer name.
  // could just import as reducer but name v unspecific
  form: formReducer,
  streams: streamReducer,
});
