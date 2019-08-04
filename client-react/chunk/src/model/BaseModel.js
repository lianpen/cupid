/*
 * @Author: lianpen
 * @Date:   2018-03-29 09:54:13
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-05-04 16:32:05
 */

/**
 * 数据模型基类
 */

import API from 'util/API'
import fn from 'util/fn'

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
	 * 数据变化了 用于react标示 触发渲染
	 */
	changed() {
		this.rid ++
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

	/**
	 * 数据请求
	 */
	request(param) {
		return API.request(param)
	}

	/**
	 * 构建请求数据
	 * interface
	 */
	buildRequestData() {
		return {}
	}

	/**
	 * 对象克隆
	 * interface
	 */
	clone() {
		return fn.deepClone(this)
	}

	/**
	 * 对象拉引
	 * 用另一个对象构建自身
	 */
	read(object) {}

	/**
	 * 浅拷贝 用于react-redux识别成新对象
	 */
	assign() {
		let result = new this.constructor()
		for (let key in this) {
			result[key] = this[key]
		}
		return result
	}

}

export default BaseModel