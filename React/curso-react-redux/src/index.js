import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { pokemonReducer } from './Reducers/pokemons';
import { Provider } from 'react-redux'
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { logger } from './Middleware';
import {thunk} from 'redux-thunk'
import { rootReducer } from './Reducers/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const composedEnhancers = composeAlt(applyMiddleware(thunk,logger)) 

// const store = createStore(pokemonReducer, composedEnhancers)
const store = createStore(rootReducer, composedEnhancers)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
