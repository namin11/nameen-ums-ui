import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import cartReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(cartReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
