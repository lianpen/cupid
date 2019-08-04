/*
 * @Author: lianpen
 * @Date:   2018-03-29 09:54:13
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-05-02 13:48:21
 */

/**
 * 全局数据中心
 */

import env from '../../env'
import actionType from './actionType'
import respool from './respool'

const initialState = {
	/**
	 * 运行环境 
	 * 开发环境 development
	 * 生产环境 production
	 */
	env: window.env === 'production' ? 'production' : 'development',
	/**
	 * 服务器地址
	 */
	serverUrl: window.env === 'production' ? window.__SERVER_URL__ : env.serverUrl,
	/**
	 * 系统配置
	 */
	config: {
		/**
		 * ab分比例
		 */
		abmultiple: 1
	},
	/**
	 * 全局加载中。。。
	 */
	pending: true,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.LOGON:
			return {
				...state,
				me: state.me,
				config: {
					...state.config,
					abmultiple: action.data.abmultiple
				},
				pending: false
			}
		case actionType.NOTICE:
			return {
				...state,
				notice: {
					...state.notice,
					visible: true,
					data: action.data
				},
				pending: false
			}
		default:
			return state
	}
}

export default reducer