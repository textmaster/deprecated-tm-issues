import R from 'ramda';
import { call, select } from 'redux-saga/effects';
import takeDebounced from 'take-debounced';
import { requestSequence } from 'request-helpers/sagas';
import { getRelatedIssues } from 'api';
import { tokenSelector, serverValuesSelector } from 'common/selectors';

function* pullRelatedIssues(action) {
  const { payload: title } = action;
  const token = yield select(tokenSelector);
  const { targetRepo } = yield select(serverValuesSelector);
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
