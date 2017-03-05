import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { authUrlSelector } from 'context/selectors';
import {
  isLoggedInSelector,
  isUserCollaboratorSelector,
  nameSelector,
} from 'session/selectors';
import { onLogout } from 'session/actions';
import Component, { STATES } from './Component';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  name: nameSelector,
  authUrl: authUrlSelector,
  isCollaborator: isUserCollaboratorSelector,
});

export default compose(
  connect(mapStateToProps, { onLogout }),
  mapProps(
    ({ isCollaborator, isLoggedIn, ...props }) => ({
      state:
        !isLoggedIn ? STATES.DISCONNECTED :
        isCollaborator ? STATES.AUTHORIZED : STATES.UNAUTHORIZED,
      ...props,
    }),
  ),
)(Component);
