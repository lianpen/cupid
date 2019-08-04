export function makeAction(actions, prefix) {
	let result = {}
	actions.forEach(action => {
		let name = action.name || action
		let value = prefix + '-' + name
		result[name] = value
	})
	return result
}