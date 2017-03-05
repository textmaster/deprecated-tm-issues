import React from 'react';
import rebassConfig from 'rebass-global-config';
import { Flex, Box } from 'reflexbox';

import Header from 'header';
import RelatedIssues from 'related-issues';
import Sequence from 'sequence';
import FormIssue from 'form-issue';

export default rebassConfig(() =>
  <div>
    <Header />
    <Sequence />
    <Flex wrap>
      <Box col={12} lg={7} px={1}>
        <FormIssue />
      </Box>
      <Box col={12} lg={5} px={1}>
        <RelatedIssues />
      </Box>
    </Flex>
  </div>,
);
