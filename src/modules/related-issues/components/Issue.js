import React, { PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import { Divider, LinkBlock, Text, Button } from 'rebass';

export const TYPES = Object.freeze({
  ISSUE: 'ISSUE',
  PULL_REQUEST: 'PULL_REQUEST',
});

export const STATES = Object.freeze({
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
});

const Issue = ({ url, title, type, state, formattedDate, username }) =>
  <Flex wrap>
    <Box col={12} mb={1}>
      <LinkBlock target="_blank" style={{ fontSize: '1.25em' }} color="gray2" href={url}>{title}</LinkBlock>
    </Box>
    <Box col={8}>
      <Text color="midgray">
        <Button
          href={`https://github.com/${username}`}
          target="_blank"
          backgroundColor="white"
          color="primary"
          m={0} p={0}
        >{username}</Button> on {formattedDate}
      </Text>
    </Box>
    <Box col={4}>
      <Text style={{ textAlign: 'right' }} color={state === STATES.OPEN ? 'success' : 'error'}>
        {type === TYPES.ISSUE ? 'Issue' : 'Pull Request'}
      </Text>
    </Box>
    <Box col={12}>
      <Divider mt={0} />
    </Box>
  </Flex>
;

Issue.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(TYPES)).isRequired,
  state: PropTypes.oneOf(Object.values(STATES)).isRequired,
  formattedDate: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Issue;
