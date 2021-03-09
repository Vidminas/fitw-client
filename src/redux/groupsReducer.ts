import { Reducer } from "redux";
import { GroupsState, initialState } from "./store";

const groupsReducer: Reducer<GroupsState> = (
  state = initialState.groups,
  action
) => {
  return state;
};

export default groupsReducer;
