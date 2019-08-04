
const module = [{
	type: 'INIT',
	desc: '初始化一个三个问题的问卷'
}, {
	type: 'SET_QUESTION_TITLE',
	desc: '设置问题标题'
}, {
	type: 'ADD_QUESTION',
	desc: '添加一个问题'
}, {
	type: 'RESET',
	desc: '重置'
}]

const prefix = 'publish'

import fn from 'util/actionType'

export default fn(module, prefix)