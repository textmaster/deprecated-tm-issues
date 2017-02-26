import R from 'ramda';
import { call, select } from 'redux-saga/effects';
import takeDebounced from 'take-debounced';
import { requestSequence } from 'request-helpers/sagas';
import { getRelatedIssues } from 'api';
import { tokenSelector } from 'common/selectors';

function* pullRelatedIssues(action) {
  const { payload: title } = action;
  const token = yield select(tokenSelector);
  yield call(
    requestSequence,
    [getRelatedIssues, token, title],
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
    200,
    R.always('form.title'),
  );
}

export default[titleChangesWatcher];
