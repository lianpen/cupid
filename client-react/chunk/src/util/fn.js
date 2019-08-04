const fn = {
	/**
	 * 空函数
	 */
	noop: () => {},
	/**
	 * 是否是一个数组
	 */
	isArray: obj => {
		return Object.prototype.toString.call(obj) === '[object Array]'
	},
	/**
	 * 是否是一个对象
	 */
	isObject: obj => {
		return Object.prototype.toString.call(obj) === '[object Object]'
	},
	/**
	 * 是否是一个字符串
	 */
	isString: obj => {
		return Object.prototype.toString.call(obj) === '[object String]'
	},
	/**
	 * 是否是一个数字
	 */
	isNumber: obj => {
		return Object.prototype.toString.call(obj) === '[object Number]'
	},
	/**
	 * 深拷贝
	 */
	deepClone: deepClone,
	/**
	 * 获取dispatch到props的映射
	 */
	getMapDispatchToProps: actionTypeList => {
		return dispatch => {
			let result = {}
			actionTypeList.forEach(actionType => {
				result[actionType] = data => {
					dispatch({
						type: actionType,
						data: data
					})
				}
			})
			return result
		}
	}
}

/**
 * 深拷贝
 */
function deepClone(obj) {
	const type = Object.prototype.toString.call(obj)
	if (type === '[object Array]') {
		let result = []
		for (let i = 0; i < obj.length; i += 1) {
			result.push(deepClone(obj[i]))
		}
		return result
	} else if (type == '[object Object]') {
		let result = {}
		for (let key in obj) {
			result[key] = deepClone(obj[key])
		}
		return result
	} else {
		return obj
	}
}

window.fn = fn

export default fn