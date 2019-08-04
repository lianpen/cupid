/*
 * @Author: lianpen
 * @Date:   2018-06-08 09:59:43
 */
import {
	combineReducers
} from 'redux'

import m_index from './index/reducer'
import m_screen from './screen/reducer'
import m_detail from './detail/reducer'

export default combineReducers({
	m_index,
	m_screen,
	m_detail
})