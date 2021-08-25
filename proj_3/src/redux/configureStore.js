import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(inititalState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        inititalState,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant())));
}