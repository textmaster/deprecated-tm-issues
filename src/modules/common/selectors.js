import R from 'ramda';
import { createSelector } from 'reselect';
import { STEPS, STEPS_ORDER } from './constants';

export const erroredRequestsSelector = R.prop('erroredRequests');
export const ongoingRequestsSelector = R.prop('ongoingRequests');

export const userInfoSelector = R.prop('userInfo');
export const serverValuesSelector = R.prop('serverValues');
export const formValuesSelector = R.pathOr({}, ['form', 'issue', 'values']);
export const isIssuePostedSelector = R.prop('isIssuePosted');

export const isUserCollaboratorSelector = createSelector(
  [userInfoSelector],
  R.propOr(false, 'hasPermission'),
);

const isPropLongerThan = (propName, minLength) =>
  ({ [propName]: prop }) => !!prop && prop.length > minLength;

// STEP VALIDATIONS
const stepValidators = {
  [STEPS.CONNECT]: isUserCollaboratorSelector,
  [STEPS.TITLE]: createSelector(
    [formValuesSelector],
    isPropLongerThan('title', 5),
  ),
  [STEPS.TYPE]: createSelector(
    [formValuesSelector],
    isPropLongerThan('type', 0),
  ),
  [STEPS.PLATFORM]: createSelector(
    [formValuesSelector],
    isPropLongerThan('platform', 0),
  ),
  [STEPS.DESCRIPTION]: createSelector(
    [formValuesSelector],
    isPropLongerThan('description', 14),
  ),
  [STEPS.SEND]: isIssuePostedSelector,
};

export const currentStepSelector = createSelector(
  STEPS_ORDER.map(R.propOr(R.F, R.__, stepValidators)),
  (...conditions) => {
    const firstNonPassed = conditions.findIndex(c => !c);
    return firstNonPassed === -1 ? conditions.length : firstNonPassed;
  },
);
