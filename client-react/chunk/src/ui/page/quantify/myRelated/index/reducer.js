/*
 * @Author: lianpen
 * @Date:   2018-06-08 10:13:09
 */

import constants from 'global/constants'
import actionType from './actionType'

const initialState = {
	/**
	 * 过滤
	 */
	filter: {
		/**
		 * 时间
		 */
		time: constants.ALL,
		/**
		 * 状态
		 */
		status: constants.ALL
	},
	/**
	 * 奖扣列表
	 */
	recordList: [],
	/**
	 * 记录总数
	 */
	totalNumber: 0,
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
	pending: true
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.FETCH_LIST_0:
			return {
				...state,
				refreshing: false,
				pending: true,
				pageIndex: state.pageIndex + 1
			}
		case actionType.FETCH_LIST_1:
			return {
				...state,
				refreshing: false,
				pending: false,
				recordList: [
					...state.recordList,
					...action.data.recordList
				],
				totalNumber: action.data.totalNumber
			}
		case actionType.RESET_FETCH_LIST_0:
			return {
				...state,
				refreshing: true,
				pending: false,
				pageIndex: 0,
				recordList: []
			}
		case actionType.RESET_FETCH_LIST_1:
			return {
				...state,
				refreshing: false,
				pending: false,
				recordList: action.data.recordList,
				totalNumber: action.data.totalNumber
			}
		case actionType.SET_FILTER_TIME:
			return {
				...state,
				filter: {
					...state.filter,
					time: action.data
				}
			}
		case actionType.SET_FILTER_STATUS:
			return {
				...state,
				filter: {
					...state.filter,
					status: action.data
				}
			}
		case actionType.RESET_ALL:
			return initialState
		default:
			return state
	}
}

export default reducer