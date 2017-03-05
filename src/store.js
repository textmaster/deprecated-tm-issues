import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

const devMode = process.env.NODE_ENV !== 'production';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const getMiddlewares = () => {
  const common = [sagaMiddleware];
  const dev = [loggerMiddleware];
  const prod = [];
  return [...common, ...(devMode ? dev : prod)];
};

const getEnhancers = () => (
  devMode && window.devToolsExtension ? [window.devToolsExtension()] : []
);

export default (reducer) => {
  const store = compose(
    applyMiddleware(...getMiddlewares()),
    ...getEnhancers(),
  )(createStore)(reducer);
  store.runSaga = sagaMiddleware.run;
  return store;
};
