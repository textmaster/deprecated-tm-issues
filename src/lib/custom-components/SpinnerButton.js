import React, { PropTypes } from 'react';
import Spinner from 'react-svg-spinner';
import { Button, Space } from 'rebass';

const SpinnerButton = ({
  isSpinning,
  onClick,
  spinnerProps,
  spaceProps,
  children,
  ...props
}) =>
  <Button
    {...props}
    onClick={onClick}
  >
    {children}
    {isSpinning ? <span><Space {...spaceProps} /><Spinner {...spinnerProps} /></span> : null}
  </Button>;

SpinnerButton.defaultProps = {
  spinnerProps: Object.assign({}, Spinner.defaultProps, { color: 'black' }),
  spaceProps: Object.assign({}, Space.defaultProps, { x: 2 }),
};

SpinnerButton.propTypes = {
  isSpinning: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  spinnerProps: PropTypes.shape(Spinner.propTypes),
  spaceProps: PropTypes.shape(Space.propTypes),
  children: PropTypes.node.isRequired,
};

export default SpinnerButton;
