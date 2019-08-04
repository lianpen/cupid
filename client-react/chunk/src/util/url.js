/*
 * @Author: lianpen
 * @Date:   2018-03-21 16:59:01
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-05-04 16:31:43
 */

/**
 * 地址算法
 */

const module = {
	/**
	 * 计算search上的值
	 */
	getValue: key => {
		let search = window.location.search
		let hash = window.location.hash
		if (search) {
			search = search.slice(1)
		} else {
			if (hash == '#/') hash = ''
			if (hash) {
				if (hash.indexOf('?') == -1) return null
				search = hash.replace(/^.*\?/, '')
			}
		}
		if (!search) return null
		const reg = new RegExp('(?:&|^)' + key + '=(.*?)(?=&|$)')
		const matchResult = search.match(reg)
		return matchResult && matchResult.length >= 2 ? matchResult[1] : null
	},
	/**
	 * 计算哈希
	 */
	getHash: () => {
		let hash = window.location.hash
		hash = hash.replace(/\?.*/, '').replace(/^#/, '')
		return hash
	},

	/**
	 * 根据对象创造地址
	 * encodeURIComponent:防止乱码
	 */
	getSearch: obj => {
		let dummy = []
		for (let key in obj) {
			dummy.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
		}
		return dummy.join('&')
	}
}
export default module