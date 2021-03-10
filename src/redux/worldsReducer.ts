import { Reducer } from "redux";
import {
  WORLD_FETCH,
  WORLD_FETCH_ALL,
  WORLD_FETCH_ALL_ERROR,
  WORLD_FETCH_ALL_SUCCESS,
  WORLD_FETCH_ERROR,
  WORLD_FETCH_SUCCESS,
} from "./actionTypes";
import { initialState, WorldsState } from "./store";

const worldsReducer: Reducer<WorldsState> = (
  state = initialState.worlds,
  action
) => {
  switch (action.type) {
    case WORLD_FETCH:
    case WORLD_FETCH_ALL:
      return {
        ...state,
        currentStatus: "loading",
      };
    case WORLD_FETCH_SUCCESS:
      return {
        ...state,
        currentStatus: "loaded",
        worlds: [
          ...state.worlds.filter((world) => world.id !== action.payload.id),
          action.payload,
        ],
      };
    case WORLD_FETCH_ALL_SUCCESS:
      return {
        ...state,
        currentStatus: "loaded",
        worlds: [
          ...state.worlds.filter(
            (world) =>
              !action.payload.find(
                (newWorld: typeof world) => world.id === newWorld.id
              )
          ),
          ...action.payload,
        ],
      };
    case WORLD_FETCH_ERROR:
    case WORLD_FETCH_ALL_ERROR:
      return {
        ...state,
        currentStatus: "error",
      };
    default:
      return state;
  }
};

export default worldsReducer;
