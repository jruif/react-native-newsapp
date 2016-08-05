/**
 * configureStore.js
 *
 * @Author: jruif
 * @Date: 16/7/27 下午3:02
 */

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    var store = compose(
        applyMiddleware(
            thunkMiddleware
        )
    )(createStore)(rootReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducer', () => {
            const nextReducer = require('./reducer');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
