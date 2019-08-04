import {
	combineReducers
} from 'redux'

import m_index from './index/reducer'
import m_questionnaire from './questionnaire/reducer'

export default combineReducers({
	m_index,
	m_questionnaire
})