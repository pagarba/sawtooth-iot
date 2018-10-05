import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import axios from 'axios';

import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './core/reducers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const history = createHistory();
const middleware = composeWithDevTools(
  applyMiddleware(reduxThunk, routerMiddleware(history))
);

if (localStorage.token)
  axios.defaults.headers.common.authorization = localStorage.token;
axios.defaults.baseURL = 'https://69.55.54.104';

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

const pReducer = persistReducer(persistConfig, combineReducers({ rootReducer, routerReducer }));
export const store = middleware(createStore)(pReducer);
export const persistor = persistStore(store);


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div/>} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Route component={App} />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();