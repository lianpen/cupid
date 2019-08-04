import {
	combineReducers
} from 'redux'

/**
 * 全局
 */
import m_global from 'global/reducer'

import react from 'react'

/**
 * 页面
 */
import m_publish from 'ui/page/publish/reducer'
import m_hall from 'ui/page/hall/reducer'

export default combineReducers({
	m_global,
	m_publish,
	m_hall
})