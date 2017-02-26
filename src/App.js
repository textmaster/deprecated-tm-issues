import React, { PropTypes } from 'react';
import rebassConfig from 'rebass-global-config';
import { reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';
import { Flex, Box } from 'reflexbox';

import Header from 'header';
import RelatedIssues from 'related-issues';
import Sequence from 'sequence';
import Steps from 'steps';

const App = ({ onSubmitIssue }) =>
  <div>
    <Header />
    <Sequence />
    <Flex wrap>
      <Box col={12} lg={7} px={1}>
        <form onSubmit={onSubmitIssue}>
          <Steps />
        </form>
      </Box>
      <Box col={12} lg={5} px={1}>
        <RelatedIssues />
      </Box>
    </Flex>
  </div>;
App.propTypes = { onSubmitIssue: PropTypes.func.isRequired };

export default compose(
  rebassConfig,
  reduxForm({ form: 'issue' }),
  withHandlers({
    onSubmitIssue: () => (e) => { e.preventDefault(); },
  }),
)(App);
