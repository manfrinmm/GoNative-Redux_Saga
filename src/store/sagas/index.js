import { all, takeLatest, call, put, select } from "redux-saga/effects";

import api from "../../services/api";
import { navigate } from "../../services/navigation";

import { Creators as LoginAction, Types as loginTypes } from "../ducks/login";
import {
  Creators as RepoActions,
  Types as RepoTypes
} from "../ducks/repositories";

/**
 *  OBS: sempre que for usar um metodo saga, precisa
 * colocar yield na frente
 *
 * takeLatest: Irá disparar apenas uma vez a requisição a api, pegando apenas a ultima
 *
 * takeEvery: Irá pegar todas
 *
 * select: Responsavel por fazer a busca de um estado dentro do redux
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

function* loadRepositories() {
  try {
    const { username } = yield select(state => state.login);

    const { data } = yield call(api.get, `/users/${username}/repos`);

    yield put(RepoActions.loadRepositoriesSuccess(data));
  } catch (error) {
    yield put(RepoActions.loadRepositoriesFailure());
  }
}

// *-> async / yield -> await
export default function* rootSaga() {
  return yield all([
    //dispara uma função quando tiver uma action
    takeLatest(loginTypes.REQUEST, login),
    takeLatest(RepoTypes.LOAD_REQUEST, loadRepositories)
  ]);
}
