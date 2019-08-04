/*
 * @Author: lianpen
 * @Date:   2018-03-29 11:26:31
 * @Last Modified by: hewei
 * @Last Modified time: 2018-05-22 10:11:46
 */

/**
 * 数据请求
 */

import server from 'config/server'
import fn from './fn'
import store from 'store'
import urlUtil from 'util/url'

/**
 * 发起请求
 */
function _request(url, data = {}) {
	let myInfoInStorage = localStorage.getItem('me')
	// const body = util.getBody(data, actionConfig.formToArray, actionConfig.payload)
	const contentType = util.getContentType(actionConfig.payload)
	let headers = {
		"Connection": "keep-alive",
		"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
	}
	const request = {
		method: 'post',
		body: data,
		headers: headers,
		credentials: 'include'
	}
	return new Promise(async (resolve, reject) => {
		try {
			let data = await fetch(url, request)
			let resp = await data.json()
			resolve(resp)
		} catch (error) {
			reject(error)
		}
	})
}

const API = {
	/**
	 * 对外接口 请求服务
	 */
	request: function(param) {
		const {
			module,
			action,
			data,
			imitate
		} = param
		if (imitate) {
			return _imitate(module, action, data)
		}
		const actionConfig = _getActionConfig(module, action)
		let url = _getUrl(actionConfig, api[module])
		if (!url) return fn.noopPromise
		url = store.getState().m_global.serverUrl + url
		return _request(url, data, actionConfig)
	}
}

const util = {
	getBody: function(obj) {
		let ary = []
		for (let key in obj) {
			let value = obj[key]
			value = encodeURIComponent(value)
			ary.push(key + '=' + value)
		}
		return ary.join('&')
	}
}

export default API