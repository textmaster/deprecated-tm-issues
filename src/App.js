import React, { PropTypes } from 'react';
import rebassConfig from 'rebass-global-config';
import { reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';

import Header from 'header';
import Sequence from 'sequence';
import Steps from 'steps';

const App = ({ onSubmitIssue }) =>
  <div>
    <Header />
    <Sequence />
    <form onSubmit={onSubmitIssue}>
      <Steps />
    </form>
  </div>;
App.propTypes = { onSubmitIssue: PropTypes.func.isRequired };

export default compose(
  rebassConfig,
  reduxForm({ form: 'issue' }),
  withHandlers({
    onSubmitIssue: () => (e) => { e.preventDefault(); },
  }),
)(App);
