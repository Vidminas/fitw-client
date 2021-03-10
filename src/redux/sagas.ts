import { AnyAction } from "redux";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getLocalStorageUser, setLocalStorageUser } from "../auth/localUser";
import {
  authUserWithServer,
  fetchUserWithToken,
  requestUserAuthEmail,
} from "../auth/remoteUser";
import { fetchWorld, fetchWorlds } from "../world/remoteWorld";
import * as Actions from "./actionTypes";

function* loadUserLocalStorage() {
  yield takeLatest(Actions.USER_LOADLOCAL, function* () {
    try {
      const user = yield call(getLocalStorageUser);
      yield put({ type: Actions.USER_LOADLOCAL_SUCCESS, payload: user });
      if (user) {
        yield put({ type: Actions.USER_AUTH_LOCAL, payload: user });
      }
    } catch (error) {
      yield put({ type: Actions.USER_LOADLOCAL_ERROR, payload: error });
    }
  });
}

function* authLocalUser() {
  yield takeLatest(Actions.USER_AUTH_LOCAL, function* (action: AnyAction) {
    try {
      const response = yield call(authUserWithServer, action.payload);
      yield put({
        type: Actions.USER_AUTH_LOCAL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: Actions.USER_AUTH_LOCAL_ERROR,
        payload: error.response?.data?.error?.message || error,
      });
    }
  });
}

function* requestAuthFromServer() {
  yield takeLatest(Actions.USER_AUTH_EMAIL, function* (action: AnyAction) {
    try {
      const response = yield call(requestUserAuthEmail, action.payload);
      yield put({
        type: Actions.USER_AUTH_EMAIL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: Actions.USER_AUTH_EMAIL_ERROR,
        payload: error.response?.data?.error?.message || error,
      });
    }
  });
}

function* fetchUserFromServer() {
  yield takeLatest(Actions.USER_FETCH, function* (action: AnyAction) {
    try {
      const response = yield call(fetchUserWithToken, action.payload);
      yield put({ type: Actions.USER_FETCH_SUCCESS, payload: response.data });
      yield call(setLocalStorageUser, response.data);
    } catch (error) {
      yield put({
        type: Actions.USER_FETCH_ERROR,
        payload: error.response?.data?.error?.message || error,
      });
    }
  });
}

function* fetchAllUserWorldsFromServer() {
  yield takeLatest(Actions.WORLD_FETCH_ALL, function* (action: AnyAction) {
    try {
      const response = yield call(fetchWorlds, action.payload);
      yield put({
        type: Actions.WORLD_FETCH_ALL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: Actions.WORLD_FETCH_ALL_ERROR,
        payload: error.response?.data?.error?.message || error,
      });
    }
  });
}

function* fetchWorldFromServer() {
  yield takeLatest(Actions.WORLD_FETCH, function* (action: AnyAction) {
    try {
      const response = yield call(fetchWorld, action.payload);
      yield put({ type: Actions.WORLD_FETCH_SUCCESS, payload: response.data });
    } catch (error) {
      yield put({
        type: Actions.WORLD_FETCH_ERROR,
        payload: error.response?.data?.error?.message || error,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    loadUserLocalStorage(),
    authLocalUser(),
    requestAuthFromServer(),
    fetchUserFromServer(),
    fetchAllUserWorldsFromServer(),
    fetchWorldFromServer(),
  ]);
}
