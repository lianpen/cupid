/*
 * @Author: lianpen
 * @Date:   2018-06-11 17:21:33
 */

const module = [{
	type: 'INIT',
	desc: '初始化'
}, {
	type: 'ADD_QUANTIFY_REWARD',
	desc: '新增一个奖扣'
}, {
	type: 'REMOVE_QUANTIFY_REWARD',
	desc: '删除一个奖扣'
}, {
	type: 'SET_QUANTIFY_REWARD_PROPS',
	desc: '设置某一个奖扣的属性'
}, {
	type: 'TOGGLE_UI_USEAANDOP',
	desc: '切换是否显示A分和产值'
}, {
	type: 'SET_QUANTIFY_REWARD_RECORD_DATA',
	desc: '设置某一个奖扣的某一条记录的数据'
}, {
	type: 'REMOVE_QUANTIFY_REWARD_RECORD',
	desc: '删除某一个奖扣的某一条记录'
}, {
	type: 'SET_PENDING',
	desc: '设置加载状态'
}, {
	type: 'SET_QUANTIFY_PROPS',
	desc: '更新捆包属性'
}, {
	type: 'SET_QUANTIFY_DATA',
	desc: '更新捆包数据'
}, {
	type: 'OPEN_FIRSTCHECK',
	desc: '打开初审框'
}, {
	type: 'SET_FIRSTCHECK_SUGGESTION',
	desc: '设置初审意见'
}, {
	type: 'CLOSE_FIRSTCHECK',
	desc: '关闭初审框'
}, {
	type: 'SET_QUICKRECORD_DATA',
	desc: '设置快捷设置的记录数据'
}]

const prefix = 'quantify-editor'

import fn from 'util/actionType'

export default fn(module, prefix)