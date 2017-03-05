import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  getIsRequestPendingSelector,
  getHasRequestErroredSelector,
} from 'requests/selectors';
import { onRequestErrorClear } from 'requests/actions';
import { formValuesSelector, isIssuePostedSelector } from '../../selectors';
import { onSubmit } from '../../actions';
import Component, { STATES } from './Component';

const isLoadingSelector = getIsRequestPendingSelector('form-issue');
const hasErroredSelector = getHasRequestErroredSelector('form-issue');

const mapStateToProps = createStructuredSelector({
  isIssuePosted: isIssuePostedSelector,
  isLoading: isLoadingSelector,
  hasErrored: hasErroredSelector,
  formValues: formValuesSelector,
});

const actionCreators = { onSubmit, onErrorClear: onRequestErrorClear };

export default compose(
  connect(mapStateToProps, actionCreators),
  mapProps(props => ({
    onErrorDismiss: () => props.onErrorClear('form-issue'),
    onSubmit: () => props.onSubmit(props.formValues),
    state: props.isLoading ? STATES.IN_PROGRESS :
      props.hasErrored ? STATES.ERROR :
      props.isIssuePosted ? STATES.SUCCESS : STATES.NOT_SENT,
  })),
)(Component);
