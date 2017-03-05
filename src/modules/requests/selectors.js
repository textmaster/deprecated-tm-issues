import R from 'ramda';
import { createSelector } from 'reselect';

export const erroredRequestsSelector = R.prop('erroredRequests');
export const ongoingRequestsSelector = R.prop('ongoingRequests');

const isRequestIdPresent = R.propSatisfies(req => req !== undefined);

export const getIsRequestPendingSelector = requestId =>
  createSelector(ongoingRequestsSelector, isRequestIdPresent(requestId));

export const getHasRequestErroredSelector = requestId =>
  createSelector(erroredRequestsSelector, isRequestIdPresent(requestId));
