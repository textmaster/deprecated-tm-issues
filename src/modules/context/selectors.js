import R from 'ramda';
import { createSelector } from 'reselect';

const contextSelector = R.prop('context');

export const accessTokenSelector =
  createSelector(contextSelector, R.prop('accessToken'));
export const targetRepoSelector =
  createSelector(contextSelector, R.prop('targetRepo'));
export const authUrlSelector =
  createSelector(contextSelector, R.prop('authUrl'));
