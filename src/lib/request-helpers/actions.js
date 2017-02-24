import { createTypes } from 'action-helpers';

export const REQUEST = createTypes('REQUEST', [
  'STARTED', 'SUCCEEDED', 'CANCELLED', 'ERRORED', 'ERROR_CLEARED',
]);

const getActionCreator = type => (requestId, originalAction, payload = {}) =>
  ({ type, payload, meta: { requestId, originalAction } });

export const onRequestStart = getActionCreator(REQUEST.STARTED);
export const onRequestSuccess = getActionCreator(REQUEST.SUCCEEDED);
export const onRequestError = getActionCreator(REQUEST.ERRORED);
export const onRequestCancel = getActionCreator(REQUEST.CANCELLED);
export const onRequestErrorClear = getActionCreator(REQUEST.ERROR_CLEARED);
