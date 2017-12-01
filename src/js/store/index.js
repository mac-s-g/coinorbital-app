import {
    applyMiddleware,
    createStore
} from 'redux'

import reducer from './../reducers'
import middleware from './middleware'


export default function configureStore(initial_state) {
  return createStore(
    reducer,
    initial_state,
    applyMiddleware(...middleware)
  );
};