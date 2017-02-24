import R from 'ramda';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ongoingRequests, erroredRequests } from 'request-helpers/reducers';
import modules from './modules';

const moduleReducers = R.mergeAll(
  modules.map(R.pathOr({}, ['reducers', 'default'])),
);

export default combineReducers({
  ...moduleReducers,
  form: formReducer,
  ongoingRequests,
  erroredRequests,
  serverValues: (state = {}) => state,
});
