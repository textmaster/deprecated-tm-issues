import R from 'ramda';
import { call, select, takeEvery } from 'redux-saga/effects';

import { getUserInfo } from 'api';
import { requestSequence } from 'request-helpers/sagas';
import { REQUEST } from 'request-helpers/actions';
import { USER } from 'common/actions';

const getTokenFromLocalStorage = () =>
  window.localStorage.getItem('token');

const setTokenInLocalStorage = (token) => {
  window.localStorage.setItem('token', token);
};

const clearTokenFromLocalStorage = () => {
  window.localStorage.removeItem('token');
};

function* handleInit() {
  let token = yield select(R.path(['serverValues', 'accessToken']));
  if (token) {
    window.history.replaceState(null, 'root', '/');
  } else {
    token = yield call(getTokenFromLocalStorage);
  }

  if (token) {
    const { type } = yield call(
      requestSequence,
      [getUserInfo, token],
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
