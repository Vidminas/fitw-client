import { Reducer } from "redux";
import { NEW_WORLD } from "./actionTypes";

const worldReducer: Reducer = (state, action) => {
  if (state === undefined) {
    return null;
  }

  switch (action.type) {
    case NEW_WORLD:
      return { ...state, world: {} };
    default:
      return state;
  }
};

export default worldReducer;
