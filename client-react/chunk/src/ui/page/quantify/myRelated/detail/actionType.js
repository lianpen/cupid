/*
 * @Author: lianpen
 * @Date:   2018-06-11 17:21:33
 */

const module = [{
	type: 'FETCH_QUANTIFY_0',
	desc: '加载捆包（0）'
}, {
	type: 'FETCH_QUANTIFY_1',
	desc: '加载捆包（1）'
}, {
	type: 'RESET_ALL',
	desc: '初始化'
}, {
	type: 'SET_PENDING',
	desc: '设置加载中状态'
}, {
	type: 'OPEN_FIRST_CHECK',
	desc: '打开初审框'
}, {
	type: 'CLOSE_FIRST_CHECK',
	desc: '关闭初审框'
}, {
	type: 'SET_FIRST_CHECK_SUGGESTION',
	desc: '设置初审意见'
}]

const prefix = 'quantify-myRelated-detail'

import fn from 'util/actionType'

export default fn(module, prefix)