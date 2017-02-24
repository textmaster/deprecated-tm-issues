import R from 'ramda';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  userInfoSelector, serverValuesSelector, isUserCollaboratorSelector,
} from 'common/selectors';
import { user } from 'common/actions';
import Component, { STATES } from './Component';

const authUrlSelector = createSelector(
  [serverValuesSelector],
  R.prop('authUrl'),
);
const isLoggedInSelector = createSelector(
  [userInfoSelector],
  userInfo => !!userInfo,
);
const nameSelector = createSelector(
  [userInfoSelector],
  userInfo => (userInfo ? userInfo.name : undefined),
);

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  name: nameSelector,
  authUrl: authUrlSelector,
  isCollaborator: isUserCollaboratorSelector,
});

export default compose(
  connect(mapStateToProps, user),
  mapProps(
    ({ isLoggedIn, name, authUrl, isCollaborator, onLogout }) => ({
      state:
        !isLoggedIn ? STATES.DISCONNECTED :
        isCollaborator ? STATES.AUTHORIZED : STATES.UNAUTHORIZED,
      authUrl,
      name,
      onLogout,
    }),
  ),
)(Component);
