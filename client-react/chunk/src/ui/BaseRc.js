/**
 * Base React Component
 * 基础React组件
 */
import API from 'util/API'
import store from 'store'

class BaseRc extends React.Component {

	constructor(props) {
		super(props)
	}

	/**
	 * 页面前进
	 */
	pushRouter(hash) {
		window.location.hash = hash
	}

	/**
	 * 页面替换
	 */
	replaceRouter(hash) {
		window.location.replace('/#' + hash)
	}

	/**
	 * 路由后退
	 */
	backRouter() {
		window.history.go(-1)
	}

	/**
	 * 数据请求
	 */
	request(param) {
		return API.request(param)
	}
}

window.BaseRc = BaseRc

export default BaseRc