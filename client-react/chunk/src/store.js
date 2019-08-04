/*
 * @Author: lianpen
 * @Date:   2018-06-06 17:16:03
 */

import {
	createStore,
	applyMiddleware
} from 'redux'

import reduxThunk from 'redux-thunk'

import reduxLogger from 'redux-logger'

import reducer from './reducer'

/*
const store = applyMiddleware(
	reduxThunk
)(createStore)(reducer)
*/
const store = createStore(reducer)

window.store = store

export default store