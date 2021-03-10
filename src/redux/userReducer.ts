import { Reducer } from "redux";
import * as Actions from "./actionTypes";
import { initialState, UserState } from "./store";

const userReducer: Reducer<UserState> = (state = initialState.user, action) => {
  switch (action.type) {
    case Actions.USER_LOADLOCAL:
      return {
        ...state,
        currentStatus: "loading",
      };
    case Actions.USER_LOADLOCAL_SUCCESS:
      return {
        ...state,
        currentStatus: "loadedLocal",
        user: action.payload,
      };
    case Actions.USER_LOADLOCAL_ERROR:
      return {
        ...state,
        currentStatus: "error",
        user: null,
        errorMessage: action.payload,
      };
    case Actions.USER_AUTH_LOCAL:
      return {
        ...state,
        currentStatus: "loading",
      };
    case Actions.USER_AUTH_LOCAL_SUCCESS:
      return {
        ...state,
        currentStatus: "loggedIn",
        user: action.payload,
      };
    case Actions.USER_AUTH_LOCAL_ERROR:
      return {
        ...state,
        currentStatus: "error",
        error: action.payload,
      };
    case Actions.USER_AUTH_EMAIL:
      return {
        ...state,
        currentStatus: "loading",
      };
    case Actions.USER_AUTH_EMAIL_SUCCESS:
      return {
        ...state,
        currentStatus: "sentAuthEmail",
        response: action.payload,
      };
    case Actions.USER_AUTH_EMAIL_ERROR:
      return {
        ...state,
        currentStatus: "error",
        error: action.payload,
      };
    case Actions.USER_FETCH:
      return {
        ...state,
        currentStatus: "loading",
      };
    case Actions.USER_FETCH_SUCCESS:
      return {
        ...state,
        currentStatus: "loggedIn",
        user: action.payload,
      };
    case Actions.USER_FETCH_ERROR:
      return {
        ...state,
        currentStatus: "error",
        error: action.payload,
      };
    case Actions.USER_CREATE_WORLD:
      return {
        ...state,
        currentWorld: {
          name: "a whole new world",
          background: undefined,
          fitwicks: [],
        },
      };
    case Actions.USER_ENTER_WORLD:
      return { ...state, currentWorld: action.payload };
    default:
      return state;
  }
};

export default userReducer;
