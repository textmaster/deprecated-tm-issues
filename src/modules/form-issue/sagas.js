import { takeLatest, call, select } from 'redux-saga/effects';
import { submitIssue } from 'api';
import { REQUEST } from 'requests/actions';
import { requestSequence } from 'requests/sagas';
import { tokenSelector } from 'session/selectors';
import { targetRepoSelector } from 'context/selectors';
import { FORM } from './actions';

const goToUrl = (url) => { window.location.href = url; };

function* submit(action) {
  const { payload:
    { title, type, audience, priority, platform, description },
  } = action;
  const token = yield select(tokenSelector);
  const targetRepo = yield select(targetRepoSelector);

  const { type: actionType, payload: { html_url: issueUrl } } = yield call(
    requestSequence,
    [submitIssue, token, targetRepo, title, type, audience, priority, platform, description],
    'form-issue',
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
