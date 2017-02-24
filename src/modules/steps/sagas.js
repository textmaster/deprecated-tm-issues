import R from 'ramda';
import { takeLatest, call, select } from 'redux-saga/effects';
import { submitIssue } from 'api';
import { REQUEST } from 'request-helpers/actions';
import { requestSequence } from 'request-helpers/sagas';
import { FORM } from 'common/actions';

const goToUrl = (url) => { window.location.href = url; };

function* submit(action) {
  const { payload: { title, type, platform, description } } = action;
  const token = yield select(R.path(['userInfo', 'token']));

  const { type: actionType, payload: { html_url: issueUrl } } = yield call(
    requestSequence,
    [submitIssue, token, title, type, platform, description],
    'form',
    action,
  );

  if (actionType === REQUEST.SUCCEEDED) {
    yield call(goToUrl, issueUrl);
  }
}

function* watchForFormSubmission() {
  yield takeLatest(FORM.SUBMITTED, submit);
}

export default [watchForFormSubmission];
