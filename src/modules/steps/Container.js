import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { currentStepSelector } from 'common/selectors';
import { STEPS, STEPS_ORDER, STEPS_TITLES } from 'common/constants';

import StepWrapper from './components/StepWrapper';

/* eslint-disable global-require */
const innerStepsComponents = {
  [STEPS.CONNECT]: require('./components/GithubConnect').default,
  [STEPS.TITLE]: require('./components/Title').default,
  [STEPS.TYPE]: require('./components/Type').default,
  [STEPS.PLATFORM]: require('./components/Platform').default,
  [STEPS.DESCRIPTION]: require('./components/Description').default,
  [STEPS.SEND]: require('./components/Send').default,
};

const getStepWrapperContainer = componentIndex => compose(
  connect(createStructuredSelector({ currentStep: currentStepSelector })),
  branch(
    ({ currentStep }) => currentStep >= componentIndex,
    Component => props => <Component {...props} />,
    renderNothing,
  ),
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

export default () => <div>{steps}</div>;
