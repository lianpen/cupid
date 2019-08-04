export default {
	install(Vue, options) {
		Vue.prototype.global = {
			uid: 0,
			author: 'lianpen'
		}
	}
}