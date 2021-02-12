import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import IUser from "../api/user";
import IWorld from "../api/world";
import userReducer from "./userReducer";
import worldReducer from "./worldReducer";
import rootSaga from "./sagas";

export type UserStateStatus =
  | "initial"
  | "error"
  | "loading"
  | "loadedLocal"
  | "sentAuthEmail"
  | "loggedIn";

export type UserState = {
  currentStatus: UserStateStatus;
  user: IUser | null;
  error?: string;
  response?: any;
};

export type WorldState = {
  world: IWorld | null;
};

export type AppState = {
  user: UserState;
  world: WorldState;
};

export const initialState: AppState = {
  user: {
    currentStatus: "initial",
    user: null,
  },
  world: {
    world: null,
  },
};

const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    world: worldReducer,
  });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(),
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
