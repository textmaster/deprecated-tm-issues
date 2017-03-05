import R from 'ramda';
import { call, select } from 'redux-saga/effects';
import takeDebounced from 'take-debounced';
import { requestSequence } from 'requests/sagas';
import { getRelatedIssues } from 'api';
import { targetRepoSelector } from 'context/selectors';
import { tokenSelector } from 'session/selectors';

function* pullRelatedIssues(action) {
  const { payload: title } = action;
  const token = yield select(tokenSelector);
  const targetRepo = yield select(targetRepoSelector);
  yield call(
    requestSequence,
    [getRelatedIssues, token, targetRepo, title],
    'relatedIssues',
    action,
  );
}

function* titleChangesWatcher() {
  yield takeDebounced(
    ({ type, meta, payload }) => (
      type === '@@redux-form/CHANGE' &&
        meta.form === 'issue' && meta.field === 'title' && payload.length > 0
    ),
    pullRelatedIssues,
    500,
    R.always('form.title'),
  );
}

export default[titleChangesWatcher];
