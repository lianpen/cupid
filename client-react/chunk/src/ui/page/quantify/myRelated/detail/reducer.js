/*
 * @Author: lianpen
 * @Date:   2018-06-08 10:13:09
 */

import constants from 'global/constants'
import actionType from './actionType'

const initialState = {
	/**
	 * 捆包对象
	 */
	quantify: null,
	/**
	 * 数据提交中
	 */
	pending: false,
	/**
	 * 初审框
	 */
	firstCheck: {
		open: false,
		suggestion: ''
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.FETCH_QUANTIFY_0:
			return {
				...state,
				quantify: null
			}
		case actionType.FETCH_QUANTIFY_1:
			return {
				...state,
				quantify: action.data
			}
		case actionType.SET_PENDING:
			return {
				...state,
				pending: action.data
			}
		case actionType.OPEN_FIRST_CHECK:
			return {
				...state,
				firstCheck: {
					open: true,
					suggestion: ''
				}
			}
		case actionType.CLOSE_FIRST_CHECK:
			return {
				...state,
				firstCheck: {
					open: false,
					suggestion: ''
				}
			}
		case actionType.SET_FIRST_CHECK_SUGGESTION:
			return {
				...state,
				firstCheck: {
					open: true,
					suggestion: action.data
				}
			}
		case actionType.RESET_ALL:
			return initialState
		default:
			return state
	}
}

export default reducer