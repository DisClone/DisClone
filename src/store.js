import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
