import React from 'react';
import ReactDOM from 'react-dom';
import smoothScroll from 'smoothscroll';

export default Component => class ScrollIntoView extends React.Component {
  render() {
    return <Component {...this.props} />;
  }

  componentDidMount() {
    /* eslint-disable react/no-find-dom-node */
    const domNode = ReactDOM.findDOMNode(this);
    const absBottom =
      domNode.getBoundingClientRect().bottom -
      document.body.getBoundingClientRect().top;
    const targetScroll = Math.max(0, absBottom - window.innerHeight);
    smoothScroll(targetScroll);
  }
};
