import React, { PropTypes } from 'react';
import { DisposableMessage, SpinnerButton } from 'custom-components';

export const STATES = Object.freeze({
  NOT_SENT: 'NOT_SENT',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

/* eslint-disable no-multi-spaces */
const getButtonMessage = state => (
  state === STATES.IN_PROGRESS ? 'Submitting Issue' :
  state === STATES.SUCCESS     ? 'Issue Submitted' :
                                 'Sumit Issue'
);

const getButtonTheme = state => (
  state === STATES.IN_PROGRESS ? 'secondary' :
  state === STATES.SUCCESS     ? 'success' :
                                  undefined
);
/* eslint-enable no-multi-spaces */

const Component = ({ state, onSubmit, onErrorDismiss }) =>
  <div>
    <DisposableMessage
      isRendered={state === STATES.ERROR}
      theme="error"
      message="There was an error while submitting the Issue. Please try again."
      onClose={onErrorDismiss}
    />
    <SpinnerButton
      theme={getButtonTheme(state)}
      disabled={state === STATES.IN_PROGRESS || state === STATES.SUCCESS}
      isSpinning={state === STATES.IN_PROGRESS}
      onClick={onSubmit}
      mb={3}
    >
      {getButtonMessage(state)}
    </SpinnerButton>
  </div>;

Component.propTypes = {
  state: PropTypes.oneOf(Object.values(STATES)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onErrorDismiss: PropTypes.func.isRequired,
};

export default Component;
