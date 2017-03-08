import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { compose, mapProps, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import renderNothingIf from 'render-nothing-if';
import { currentStepSelector } from './selectors';
import { STEPS, STEPS_ORDER, STEPS_TITLES } from './constants';

import StepWrapper from './components/StepWrapper';

/* eslint-disable global-require */
const innerStepsComponents = {
  [STEPS.CONNECT]: require('./components/GithubConnect').default,
  [STEPS.TITLE]: require('./components/Title').default,
  [STEPS.AUDIENCE]: require('./components/Audience').default,
  [STEPS.PRIORITY]: require('./components/Priority').default,
  [STEPS.TYPE]: require('./components/Type').default,
  [STEPS.PLATFORM]: require('./components/Platform').default,
  [STEPS.DESCRIPTION]: require('./components/Description').default,
  [STEPS.SEND]: require('./components/Send').default,
};

const getStepWrapperContainer = componentIndex => compose(
  connect(createStructuredSelector({ currentStep: currentStepSelector })),
  renderNothingIf(R.propSatisfies(R.gt(componentIndex), 'currentStep')),
  withProps(({ currentStep }) => ({ isSuccess: currentStep > componentIndex })),
)(StepWrapper);

const steps = STEPS_ORDER
  .map(key => ({
    InnerStepComponent: innerStepsComponents[key],
    title: STEPS_TITLES[key],
    key,
  }))
  .map(({ InnerStepComponent, title, key }, idx) => {
    const Wrapper = getStepWrapperContainer(idx);
    return (
      <Wrapper key={key} title={title}>
        <InnerStepComponent />
      </Wrapper>
    );
  });

export default compose(
  reduxForm({ form: 'issue' }),
  mapProps(R.always(({ children: steps }))),
)('form');
