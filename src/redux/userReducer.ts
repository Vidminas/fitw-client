import { Reducer } from "redux";
import { USER_LOADED } from "./actionTypes";

const userReducer: Reducer = (state, action) => {
  if (state === undefined) {
    return null;
  }

  switch (action.type) {
    case USER_LOADED:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
