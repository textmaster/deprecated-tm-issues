import { delay } from 'redux-saga';
import { call, cancel, fork, take } from 'redux-saga/effects';

function* delayedSaga(saga, ms, action) {
  yield call(delay, ms);
  yield call(saga, action);
}

export default function* takeDebounced(
  takePattern,
  saga,
  ms,
  getTaskIdentifier = action => action.type,
) {
  const tasks = {};
  while (true) {
    const action = yield take(takePattern);
    const taskId = getTaskIdentifier(action);
    const task = tasks[taskId];
    if (task && task.isRunning()) yield cancel(task);
    tasks[taskId] = yield fork(delayedSaga, saga, ms, action);
  }
}

