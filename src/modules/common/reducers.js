import { REQUEST } from 'request-helpers/actions';
import { USER } from 'common/actions';

const ini = null;

const userInfo = (state = ini, { type, payload, meta: { requestId } = {} }) => {
  switch (type) {
    case REQUEST.SUCCEEDED: {
      return requestId === 'userInfo' ? payload : state;
    }
    case REQUEST.ERRORED:
      // If it's in the family of the 4 hundreds is an unauthorized request
      return Math.floor(payload.statusCode / 100) === 4 ? ini : state;
    case USER.LOGOUT_REQUESTED:
      return ini;
    default:
      return state;
  }
};

const isIssuePosted = (state = false, { type, meta: { requestId } = {} }) => (
  type === REQUEST.SUCCEEDED && requestId === 'form' ? true : state
);

export default {
  isIssuePosted,
  userInfo,
};
