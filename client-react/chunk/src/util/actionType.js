/*
 * @Author: lianpen
 * @Date:   2018-06-11 17:27:20
 */

function fn(actionTypeList, prefix) {
	const result = {}
	actionTypeList.forEach(actionType => {
		result[actionType.type] = 'action' + '[' + prefix + ']' + actionType.type + ' --' + actionType.desc
	})
	return result
}

export default fn