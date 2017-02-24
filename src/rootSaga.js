import R from 'ramda';
import { fork } from 'redux-saga/effects';

import modules from './modules';

const forkAllModuleSagas = R.pipe(
  R.map(R.pathOr([], ['sagas', 'default'])),
  R.flatten,
  R.map(fork),
);

export default function* root() { yield forkAllModuleSagas(modules); }
