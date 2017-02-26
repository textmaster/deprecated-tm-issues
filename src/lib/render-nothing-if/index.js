import React from 'react';

export default condition => Component => props => (
  condition(props) ? null : <Component {...props} />
);
