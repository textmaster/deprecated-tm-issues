import React, { PropTypes } from 'react';
import { Button, Space } from 'rebass';

export const STATES = Object.freeze({
  DISCONNECTED: 'DISCONNECTED',
  AUTHORIZED: 'AUTHORIZED',
  UNAUTHORIZED: 'UNAUTHORIZED',
});

const getMessage = (state, name) => (
  state === STATES.DISCONNECTED ?
    'Connect to Github' :
    `Connected as ${name}${state === STATES.UNAUTHORIZED ?
      ', but you are not authorized to create issues.' : ''}`
);

const Component = ({ state, authUrl, name, onLogout }) =>
  <div>
    <Button
      my={2}
      disabled={state !== STATES.DISCONNECTED}
      href={authUrl}
      theme={
        state === STATES.UNAUTHORIZED ? 'warning' :
        state === STATES.AUTHORIZED ? 'success' :
                                      'primary'
      }
      type="button"
    >{getMessage(state, name)}</Button>
    <Space x={3} />
    {state !== STATES.DISCONNECTED ?
      <Button onClick={onLogout} type="button">Logout</Button> :
      null
    }
  </div>;

Component.defaultProps = { name: undefined };

Component.propTypes = {
  state: PropTypes.oneOf(Object.values(STATES)).isRequired,
  authUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default Component;
