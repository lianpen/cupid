/*
 * @Author: lianpen
 * @Date:   2018-06-12 14:15:48
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
	type: 'SET_FORM_ITEM',
	desc: '设置表单项'
}, {
	type: 'RESET_FORM_ITEM',
	desc: '重置表单项'
}, {
	type: 'RESET_ALL',
	desc: '初始化'
}]

const prefix = 'quantify-myCreated-screen'

import fn from 'util/actionType'

export default fn(module, prefix)