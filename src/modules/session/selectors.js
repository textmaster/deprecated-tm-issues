import R from 'ramda';
import { createSelector } from 'reselect';

const userInfoSelector = R.prop('userInfo');

export const isLoggedInSelector =
  createSelector(userInfoSelector, R.complement(R.isEmpty));

export const nameSelector =
  createSelector(userInfoSelector, R.prop('name'));

export const tokenSelector =
  createSelector(userInfoSelector, R.prop('token'));

export const isUserCollaboratorSelector = createSelector(
  [userInfoSelector],
  R.propOr(false, 'hasPermission'),
);
