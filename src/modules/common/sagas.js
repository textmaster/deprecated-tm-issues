import { call, select, takeEvery } from 'redux-saga/effects';

import { getUserInfo } from 'api';
import { requestSequence } from 'request-helpers/sagas';
import { REQUEST } from 'request-helpers/actions';
import { USER } from 'common/actions';
import { serverValuesSelector } from 'common/selectors';

const getTokenFromLocalStorage = () =>
  window.localStorage.getItem('token');

const setTokenInLocalStorage = (token) => {
  window.localStorage.setItem('token', token);
};

const clearTokenFromLocalStorage = () => {
  window.localStorage.removeItem('token');
};

function* handleInit() {
  let { accessToken: token } = yield select(serverValuesSelector);
  if (token) {
    window.history.replaceState(null, 'root', '/');
  } else {
    token = yield call(getTokenFromLocalStorage);
  }

  if (token) {
    const { targetRepo } = yield select(serverValuesSelector);
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
  yield takeEvery(USER.LOGOUT_REQUESTED, clearTokenFromLocalStorage);
}

export default [handleInit, logoutWatcher];
