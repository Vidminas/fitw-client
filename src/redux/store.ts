import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import IUser from "../api/user";
import userReducer from "./userReducer";
import worldReducer from "./worldReducer";

export type AppState = {
  isAuthed: boolean;
  user: IUser;
};

const initialState = {
  user: null,
  world: null,
};

const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    world: worldReducer,
  });

const store = createStore(
  createRootReducer(),
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
