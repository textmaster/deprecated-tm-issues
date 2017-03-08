import React, { PropTypes } from 'react';
import { Base, Container, Heading, Space } from 'rebass';
import scrollIntoView from 'scroll-into-view';
import Icon from 'react-geomicons';

const Component = ({ title, isSuccess, children }) =>
  <Container mt={2}>
    <Heading mb={2} level={2}>
      {title}
      <Space x={2} />
      {isSuccess ?
        <Base style={{ display: 'inline' }} color="success">
          <Icon name="check" />
        </Base> :
        null
      }
    </Heading>
    {children}
  </Container>;

Component.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};

export default scrollIntoView(Component);
