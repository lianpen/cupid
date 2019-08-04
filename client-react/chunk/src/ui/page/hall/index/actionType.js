
const module = [{
	type: 'INIT',
	desc: '初始化'
}, {
	type: 'RESET',
	desc: '重置'
}]

const prefix = 'publish'

import fn from 'util/actionType'

export default fn(module, prefix)