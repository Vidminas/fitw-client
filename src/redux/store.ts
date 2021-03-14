import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import IUser from "../api/user";
import IWorld from "../api/world";
import userReducer from "./userReducer";
import worldsReducer from "./worldsReducer";
import rootSaga from "./sagas";
import IGroup from "../api/group";
import groupsReducer from "./groupsReducer";

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
  currentWorld: IWorld | null;
  error?: string;
  response?: any;
};

export type WorldsStateStatus =
  | "initial"
  | "error"
  | "loading"
  | "loaded"
  | "deleted";

export type WorldsState = {
  currentStatus: WorldsStateStatus;
  worlds: IWorld[];
  error?: string;
  data?: any;
};

export type GroupsState = {
  groups: IGroup[];
};

export type AppState = {
  user: UserState;
  worlds: WorldsState;
  groups: GroupsState;
};

export const initialState: AppState = {
  user: {
    currentStatus: "initial",
    user: null,
    currentWorld: null,
  },
  worlds: {
    currentStatus: "initial",
    worlds: [
      {
        name: "Default World",
        background: "",
        fitwicks: [],
      },
    ],
  },
  groups: {
    groups: [],
  },
};

const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    worlds: worldsReducer,
    groups: groupsReducer,
  });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createRootReducer(),
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
