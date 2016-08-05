/**
 * index.js
 *
 * @Author: jruif
 * @Date: 16/7/27 下午3:03
 */

import { combineReducers } from 'redux';

let initState = {
    name: 'haha'
};

export default combineReducers({
    app: (state = initState, action) => state
});
