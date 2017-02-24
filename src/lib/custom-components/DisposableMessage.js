import React, { PropTypes } from 'react';
import { Close, Message, Space } from 'rebass';

const DisposableMessage = ({ theme, message, onClose, isRendered = true }) => (
  isRendered ?
    <Message inverted rounded theme={theme}>
      {message}
      <Space auto x={1} />
      <Close onClick={onClose} />
    </Message> : null
);

DisposableMessage.propTypes = {
  isRendered: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    'primary', 'secondary', 'default', 'info', 'success', 'warning', 'error',
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DisposableMessage;
