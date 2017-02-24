import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './App';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import configureStore from './store';

const render = (component, store) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

const store = configureStore(rootReducer);
store.sagaTask = store.runSaga(rootSaga);
render(App, store);

if (module.hot) {
  module.hot.accept(['./App', './rootReducer', './rootSaga'], () => {
    /* eslint-disable global-require */
    store.replaceReducer(require('./rootReducer').default);
    store.sagaTask.cancel();
    store.sagaTask.done.then(() => {
      store.sagaTask = store.runSaga(require('./rootSaga').default);
      render(require('./App').default, store);
    });
  });
}
