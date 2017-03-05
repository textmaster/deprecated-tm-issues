import R from 'ramda';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modules from './modules';

const moduleReducers = R.mergeAll(
  modules.map(R.pathOr({}, ['reducers', 'default'])),
);

export default combineReducers({
  ...moduleReducers,
  form: formReducer,
});
