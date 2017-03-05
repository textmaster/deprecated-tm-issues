import { REQUEST } from 'requests/actions';

// null indicates that no search has been performed, an empty array on the
// otther hand indicates that no results came back after performing a search
const relatedIssues = (
  state = null, { type, meta: { requestId } = {}, payload },
) => (
  type === REQUEST.SUCCEEDED && requestId === 'relatedIssues' ? payload : state
);

export default { relatedIssues };
