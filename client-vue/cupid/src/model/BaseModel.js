/*
 * @Author: lianpen
 * @Date:   2018-03-29 09:54:13
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-05-04 16:32:05
 */

/**
 * 数据模型基类
 */

/**
 * 对象uuid
 */
let uuid = 0

class BaseModel {

	constructor(dictionary, data) {
		this.uuid = ++uuid
		/**
		 * 渲染id标示视图改变
		 */
		this.rid = 0
		this.parse(dictionary, data)
	}
	/**
	 * 解析数据结构和初始数据
	 */
	parse(dictionary, data) {
		if (!dictionary || !dictionary.length) return
		data = data || {}
		data = camelize(data)
		dictionary.forEach(sol => {
			if (!sol || sol.length != 3) return
			let key = sol[0]
			let value = data[key] || sol[1]
			this[key] = value
		})
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

export default BaseModel