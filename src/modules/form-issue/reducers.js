import { REQUEST } from 'requests/actions';

const isIssuePosted = (state = false, { type, meta: { requestId } = {} }) => (
  type === REQUEST.SUCCEEDED && requestId === 'issue-form' ? true : state
);

export default { isIssuePosted };
