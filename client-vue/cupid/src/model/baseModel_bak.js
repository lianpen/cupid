export default {
	init(dictionary, data) {
		let result = {}
		if (!dictionary || !dictionary.length) return result
		data = data || {}
		data = camelize(data)
		dictionary.forEach(sol => {
			if (!sol || sol.length != 3) return
			let key = sol[0]
			let value = data[key] || sol[1]
			result[key] = value
		})
		return result
		function camelize(o) {
			let r = {}
			for (let key in o) {
				let cr = key.replace(/_[a-z]/g, (a, b, c) => {
					return a.toLocaleUpperCase().slice(1)
				})
				r[cr] = o[key]
			}
			return r
		}
	}
}