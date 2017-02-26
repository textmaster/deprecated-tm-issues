import React, { PropTypes } from 'react';
import { Heading, Container } from 'rebass';
import Issue from './Issue';

const Component = ({ issues }) =>
  <Container pl={2}>
    <Heading mb={3} level={2}>
      {issues.length > 0 ? 'Is your issue related to:' : 'No related Issues found'}
    </Heading>
    {issues.map(({ id, ...issue }) =>
      <Issue key={id} {...issue} />,
    )}
  </Container>;

Component.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    ...Issue.propTypes,
  })).isRequired,
};

export default Component;
