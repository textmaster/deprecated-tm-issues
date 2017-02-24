import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createSelector, createStructuredSelector } from 'reselect';
import {
  formValuesSelector,
  isIssuePostedSelector,
  erroredRequestsSelector,
  ongoingRequestsSelector,
} from 'common/selectors';
import { form } from 'common/actions';
import { onRequestErrorClear } from 'request-helpers/actions';
import Component, { STATES } from './Component';

const isLoadingSelector =
  createSelector(ongoingRequestsSelector, req => !!req.form);
const hasErroredSelector =
  createSelector(erroredRequestsSelector, req => !!req.form);

const mapStateToProps = createStructuredSelector({
  isIssuePosted: isIssuePostedSelector,
  isLoading: isLoadingSelector,
  hasErrored: hasErroredSelector,
  formValues: formValuesSelector,
});

const actionCreators = {
  onSubmit: form.onSubmit,
  onErrorClear: onRequestErrorClear,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  mapProps(({
    hasErrored, isLoading, isIssuePosted, formValues, onSubmit, onErrorClear,
  }) => ({
    onErrorDismiss: () => onErrorClear('form'),
    onSubmit: () => onSubmit(formValues),
    state: isLoading ? STATES.IN_PROGRESS :
      hasErrored ? STATES.ERROR :
      isIssuePosted ? STATES.SUCCESS : STATES.NOT_SENT,
  })),
)(Component);
