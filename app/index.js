/**
 * index.jsx
 *
 * @Author: jruif
 * @Date: 16/7/27 上午11:41
 */

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './containers/index.js';

class Index extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let store = configureStore({});
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
export default Index;