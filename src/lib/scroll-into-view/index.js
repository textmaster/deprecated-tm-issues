import React from 'react';
import ReactDOM from 'react-dom';

export default Component => class ScrollIntoView extends React.Component {
  render() {
    return <Component {...this.props} />;
  }

  componentDidMount() {
    /* eslint-disable react/no-find-dom-node */
    const domNode = ReactDOM.findDOMNode(this);
    domNode.scrollIntoView({ behavior: 'smooth' });
  }
};
