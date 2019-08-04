/*
 * @Author: lianpen
 * @Date:   2018-06-14 14:38:00
 */

import actionType from './actionType'
import constants from 'global/constants'
import model from 'model'

const initialState = {
	/**
	 * 模式
	 * 新增模式与编辑模式
	 */
	mode: null,
	/**
	 * 捆包
	 */
	quantify: new model.Quantify(),
	/**
	 * ui列表
	 */
	uiList: [],
	/**
	 * 请求中
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
	let uiList
	let quantify
	let reward
	let record
	let index
	switch (action.type) {
		case actionType.INIT:
			return {
				...initialState,
				...action.data,
				uiList: action.data.quantify.rewardList.map(reward => new Ui(reward))
			}
		case actionType.ADD_QUANTIFY_REWARD:
			return {
				...state,
				quantify: state.quantify.assign({
					props: {
						rewardList: {
							type: constants.DB.INSERT
						}
					}
				}),
				uiList: state.uiList.concat(new Ui())
			}
		case actionType.REMOVE_QUANTIFY_REWARD:
			index = action.data
			quantify = state.quantify.assign({
				props: {
					rewardList: {
						type: constants.DB.DELETE,
						index: index
					}
				}
			})
			uiList = state.uiList.slice(0)
			uiList.splice(index, 1)
			/**
			 * 如果奖扣清空的话 要加上一个
			 */
			if (!quantify.rewardList.length) {
				quantify.addNewReward()
				uiList.push(new Ui())
			}
			return {
				...state,
				quantify: quantify,
				uiList: uiList
			}
		case actionType.SET_QUANTIFY_REWARD_PROPS:
			return {
				...state,
				quantify: state.quantify.assign({
					props: {
						rewardList: {
							type: constants.DB.UPDATE,
							index: action.data.rewardIndex,
							props: action.data.props
						}
					}
				})
			}
		case actionType.TOGGLE_UI_USEAANDOP:
			uiList = [
				...state.uiList
			]
			uiList[action.data.uiIndex] = uiList[action.data.uiIndex].assignToggleUseAAndOp()
			return {
				...state,
				uiList: uiList
			}
		case actionType.SET_QUANTIFY_REWARD_RECORD_DATA:
			return {
				...state,
				quantify: state.quantify.assign({
					props: {
						rewardList: {
							type: constants.DB.UPDATE,
							index: action.data.rewardIndex,
							props: {
								recordList: {
									type: constants.DB.UPDATE,
									index: action.data.recordIndex,
									data: action.data.data
								}
							}
						}
					}
				})
			}
		case actionType.REMOVE_QUANTIFY_REWARD_RECORD:
			return {
				...state,
				quantify: state.quantify.assign({
					props: {
						rewardList: {
							type: constants.DB.UPDATE,
							index: action.data.rewardIndex,
							props: {
								recordList: {
									type: constants.DB.DELETE,
									index: action.data.recordIndex
								}
							}
						}
					}
				})
			}
		case actionType.SET_PENDING:
			return {
				...state,
				pending: action.data
			}
		case actionType.SET_QUANTIFY_PROPS:
			return {
				...state,
				quantify: state.quantify.assign({
					props: action.data
				})
			}
		case actionType.SET_QUANTIFY_DATA:
			return {
				...state,
				quantify: state.quantify.assign({
					data: action.data
				})
			}
		case actionType.SET_QUICKRECORD_DATA:
			uiList = [
				...state.uiList
			]
			uiList[action.data.index] = uiList[action.data.index].assignQuickRecord(action.data.data)
			return {
				...state,
				uiList: uiList,
				quantify: state.quantify.assign({
					props: {
						rewardList: {
							type: constants.DB.UPDATE,
							index: action.data.index,
							props: {
								recordList: {
									type: constants.DB.UPDATE_ALL,
									data: action.data.data
								}
							}
						}
					}
				})
			}
		case actionType.OPEN_FIRSTCHECK:
			return {
				...state,
				firstCheck: {
					open: true,
					suggestion: ''
				}
			}
		case actionType.CLOSE_FIRSTCHECK:
			return {
				...state,
				firstCheck: {
					...state.firstCheck,
					open: false
				}
			}
		case actionType.SET_FIRSTCHECK_SUGGESTION:
			return {
				...state,
				firstCheck: {
					open: true,
					suggestion: action.data
				}
			}
		default:
			return state
	}
}

/**
 * ui类
 */
class Ui {

	constructor(reward) {
		/**
		 * 启动A分和产值
		 */
		this.useAAndOp = this.isUseAAndOp(reward)
		/**
		 * 快捷设置的record对象
		 */
		this.quickRecord = new model.Record()
	}

	/**
	 * 初始化时 是否启用A分和产值
	 */
	isUseAAndOp(reward) {
		if (!reward) return false
		return reward.recordList.some(record => {
			return (
				record.data.ascore && record.data.ascore > 0 ||
				record.data.opScore && record.data.opScore > 0
			)
		})
	}

	assignQuickRecord(data = {}) {
		let ui = new Ui()
		for (let key in this) {
			ui[key] = this[key]
		}
		ui.quickRecord = ui.quickRecord.assign({
			data: data
		})
		return ui
	}

	assignToggleUseAAndOp() {
		let ui = new Ui()
		for (let key in this) {
			ui[key] = this[key]
		}
		ui.useAAndOp = !this.useAAndOp
		return ui
	}

}

export default reducer