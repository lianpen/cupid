/*
 * @Author: lianpen
 * @Date:   2018-06-11 17:21:33
 */

const module = [{
	type: 'FETCH_LIST_0',
	desc: '加载更多列表（0）'
}, {
	type: 'FETCH_LIST_1',
	desc: '加载更多列表（1）'
}, {
	type: 'RESET_FETCH_LIST_0',
	desc: '重载列表（0）'
}, {
	type: 'RESET_FETCH_LIST_1',
	desc: '重载列表（1）'
}, {
	type: 'SET_FILTER_TIME',
	desc: '设置过滤时间'
}, {
	type: 'SET_FILTER_STATUS',
	desc: '设置过滤状态'
}, {
	type: 'RESET_ALL',
	desc: '初始化'
}]

const prefix = 'quantify-myRelated-index'

import fn from 'util/actionType'

export default fn(module, prefix)