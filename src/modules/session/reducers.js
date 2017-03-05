import { REQUEST } from 'requests/actions';
import { SESSION } from './actions';

const userInfo = (state = {}, { type, payload, meta: { requestId } = {} }) => {
  switch (type) {
    case REQUEST.SUCCEEDED: {
      return requestId === 'userInfo' ? payload : state;
    }
    case REQUEST.ERRORED:
      // If it's in the family of the 4 hundreds is an unauthorized request
      return Math.floor(payload.statusCode / 100) === 4 ? {} : state;
    case SESSION.LOGOUT_REQUESTED:
      return {};
    default:
      return state;
  }
};

export default { userInfo };
