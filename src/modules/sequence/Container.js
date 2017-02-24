import R from 'ramda';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { currentStepSelector } from 'common/selectors';
import { STEPS_ORDER, STEPS_TITLES } from 'common/constants';
import Component from './Component';

const getTitleFromKey = R.prop(R.__, STEPS_TITLES);
const stepTitles = STEPS_ORDER.map(getTitleFromKey);

const mapStateToProps =
  createStructuredSelector({ currentStep: currentStepSelector });

export default compose(
  connect(mapStateToProps),
  mapProps(
    ({ currentStep }) => ({
      active: currentStep - 1,
      steps: stepTitles.map(children => ({ children })),
    }),
  ),
)(Component);
