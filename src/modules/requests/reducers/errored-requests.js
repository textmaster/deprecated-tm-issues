import { REQUEST } from '../actions';

export default (state = {}, { type, meta, payload }) => {
  switch (type) {
    case REQUEST.ERRORED:
      return { ...state, [meta.requestId]: payload };
    case REQUEST.SUCCEEDED:
    case REQUEST.ERROR_CLEARED: {
      /* eslint-disable no-unused-vars */
      const { [meta.requestId]: deletedEntry, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};
