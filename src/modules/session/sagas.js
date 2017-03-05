import { call, select, takeEvery } from 'redux-saga/effects';
import { getUserInfo } from 'api';
import { accessTokenSelector, targetRepoSelector } from 'context/selectors';
import { requestSequence } from 'requests/sagas';
import { REQUEST } from 'requests/actions';
import { SESSION } from './actions';

const getTokenFromLocalStorage = () =>
  window.localStorage.getItem('token');

const setTokenInLocalStorage = (token) => {
  window.localStorage.setItem('token', token);
};

const clearTokenFromLocalStorage = () => {
  window.localStorage.removeItem('token');
};

function* handleInit() {
  let token = yield select(accessTokenSelector);
  if (token) {
    window.history.replaceState(null, 'root', '/');
  } else {
    token = yield call(getTokenFromLocalStorage);
  }

  if (token) {
    const targetRepo = yield select(targetRepoSelector);
    const { type } = yield call(
      requestSequence,
      [getUserInfo, token, targetRepo],
      'userInfo',
      { type: '@@INIT' },
    );
    if (type === REQUEST.SUCCEEDED) {
      yield call(setTokenInLocalStorage, token);
    } else {
      yield call(clearTokenFromLocalStorage);
    }
  }
}

function* logoutWatcher() {
  yield takeEvery(SESSION.LOGOUT_REQUESTED, clearTokenFromLocalStorage);
}

export default [handleInit, logoutWatcher];

