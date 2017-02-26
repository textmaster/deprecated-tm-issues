import R from 'ramda';
import { connect } from 'react-redux';
import { compose, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import renderNothingIf from 'render-nothing-if';
import Component from './Component';
import { TYPES, STATES } from './Issue';

const mapStateToProps =
  createStructuredSelector({ issues: R.prop('relatedIssues') });

export default compose(
  connect(mapStateToProps),
  renderNothingIf(R.propEq('issues', null)),
  mapProps(({ issues }) => ({
    issues: issues.map(({ pullRequest, closedAt, createdAt, ...issue }) => ({
      ...issue,
      type: pullRequest ? TYPES.PULL_REQUEST : TYPES.ISSUE,
      state: closedAt ? STATES.CLOSED : STATES.OPEN,
      formattedDate: (new Date(createdAt)).toISOString().slice(0, 10),
    })),
  })),
)(Component);
