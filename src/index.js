import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import './index.css';
import AppContainer from './AppContainer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
