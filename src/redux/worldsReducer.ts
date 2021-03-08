import { Reducer } from "redux";
import { NEW_WORLD, WORLD_FETCH_SUCCESS } from "./actionTypes";
import { initialState, WorldsState } from "./store";

const worldsReducer: Reducer<WorldsState> = (
  state = initialState.worlds,
  action
) => {
  switch (action.type) {
    case NEW_WORLD:
      return {
        ...state,
        worlds: [
          ...state.worlds,
          {
            name: "New World",
          },
        ],
      };
    case WORLD_FETCH_SUCCESS:
      return {
        ...state,
        worlds: [
          ...state.worlds.filter((world) => world.id !== action.payload.id),
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default worldsReducer;
