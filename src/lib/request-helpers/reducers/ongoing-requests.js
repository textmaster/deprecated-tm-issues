import { REQUEST } from '../actions';

export default (state = {}, { type, meta }) => {
  switch (type) {
    case REQUEST.STARTED:
      return { ...state, [meta.requestId]: { action: meta.originalAction } };
    case REQUEST.SUCCEEDED:
    case REQUEST.ERRORED:
    case REQUEST.CANCELLED: {
      /* eslint-disable no-unused-vars */
      const { [meta.requestId]: deletedEntry, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};
