/*
 * @Author: lianpen
 * @Date:   2018-06-08 10:13:09
 */

import constants from 'global/constants'
import actionType from './actionType'

const initialState = {
	/**
	 * 表单过滤
	 */
	form: {
		/**
		 * 时间
		 */
		quantifyName: '',
		/**
		 * 开始时间
		 */
		startTime: null,
		/**
		 * 结束时间
		 */
		endTime: null,
		/**
		 * 状态
		 */
		status: constants.ALL
	},
	list: {
		/**
		 * 奖扣列表
		 */
		quantifyList: [],
		/**
		 * 当前最大的分页索引
		 */
		pageIndex: 0,
		/**
		 * 页面重载中
		 */
		refreshing: false,
		/**
		 * 页面加载更多中
		 */
		pending: true,
		/**
		 * 搜索到的记录总数
		 */
		totalNumber: 0
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.FETCH_LIST_0:
			return {
				...state,
				list: {
					...state.list,
					refreshing: false,
					pending: true,
					pageIndex: state.list.pageIndex + 1
				}
			}
		case actionType.FETCH_LIST_1:
			return {
				...state,
				list: {
					...state.list,
					refreshing: false,
					pending: false,
					quantifyList: [
						...state.list.quantifyList,
						...action.data.quantifyList
					],
					totalNumber: action.data.totalNumber
				}
			}
		case actionType.RESET_FETCH_LIST_0:
			return {
				...state,
				list: {
					...state.list,
					refreshing: true,
					pending: false,
					pageIndex: 0,
					quantifyList: []
				}
			}
		case actionType.RESET_FETCH_LIST_1:
			return {
				...state,
				list: {
					...state.list,
					refreshing: false,
					pending: false,
					totalNumber: action.data.totalNumber,
					quantifyList: action.data.quantifyList
				}
			}
		case actionType.SET_FORM_ITEM:
			return {
				...state,
				form: {
					...state.form,
					...action.data
				}
			}
		case actionType.SET_FILTER_STATUS:
			return {
				...state,
				form: initialState.form
			}
		case actionType.RESET_ALL:
			return initialState
		case actionType.RESET_FORM_ITEM:
			return {
				...state,
				form: initialState.form
			}
		default:
			return state
	}
}

export default reducer