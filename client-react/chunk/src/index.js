/*
 * @Author: lianpen
 * @Date:   2018-06-05 16:46:30
 */
require('es6-promise').polyfill()
require('isomorphic-fetch')
import Index from 'ui/Index'
import store from './store'

import {
	Provider
} from 'react-redux'

ReactDOM.render(
	<Provider store={ store }>
		<Index />
    </Provider>,
	document.getElementById('container')
)

import {
	initApp
} from 'global/init'

initApp()