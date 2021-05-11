import _ from "lodash";
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // NB payload is just the id
      // also don't need lodash omit but pre-installed with create-react-app so probably neater than eg
      // const newState = { ...state };
      // delete newState[action.payload];
      // return newState;
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      /* also using lodash to map stream array back into our state object
        a) spread state
        b) make new array from action payload, with each item having key of id
        c) spread object from mapKeys to merge
         */
      return { ...state, ..._.mapKeys(action.payload, "id") };

    default:
      return state;
  }
};

export default streamReducer;
