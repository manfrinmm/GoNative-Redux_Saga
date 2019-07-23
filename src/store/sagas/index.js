import { all, takeLatest, call, put } from "redux-saga/effects";

import api from "../../services/api";
import { navigate } from "../../services/navigation";

import * as LoginAction from "../actions/login";

/**
 *  OBS: sempre que for usar um metodo saga, precisa
 * colocar yield na frente
 *
 * takeLatest: Irá disparar apenas uma vez a requisição a api, pegando apenas a ultima
 *
 * takeEvery: Irá pegar todas
 *
 */

function* login(action) {
  try {
    const { username } = action.payload;

    yield call(api.get, `/users/${username}`);

    // loginSuccess(username); ->
    yield put(LoginAction.loginSuccess(username));

    // navigation.navigate("Repositories"); ->
    navigate("Repositories");
  } catch (error) {
    // loginFailure(); ->
    yield put(LoginAction.loginFailure());
  }
}

// *-> async / yield -> await
export default function* rootSaga() {
  return yield all([
    //dispara uma função quando tiver uma action
    takeLatest("LOGIN_REQUEST", login)
  ]);
}
