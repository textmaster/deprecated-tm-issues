import { call, cancelled, put } from 'redux-saga/effects';
import {
  onRequestError,
  onRequestStart,
  onRequestSuccess,
  onRequestCancel,
} from './actions';

/* eslint-disable import/prefer-default-export */
export function* requestSequence(callFn, requestId, originalAction) {
  yield put(onRequestStart(requestId, originalAction));
  let payload;
  try {
    try {
      payload = yield call(...callFn);
    } catch (e) {
      return yield put(onRequestError(requestId, originalAction, {
        message: e.message,
        statusCode: e.statusCode,
        stack: e.stack,
        date: (new Date()).getTime(),
      }));
    }
    return yield put(onRequestSuccess(requestId, originalAction, payload));
  } finally {
    if (yield cancelled()) {
      yield put(onRequestCancel(requestId, originalAction));
    }
  }
}

export default [];
