import Vue from 'vue'
import axios from 'axios'
import utils from '~/utils/baseUtils'

export default () => {
	
	/**
	 * noop
	 */
  Vue.prototype.noop = () => {}
	
	/**
	 * request
	 */
	Vue.prototype.request = async (action, params) => {
		let result = await utils.request(action, params)
		return result
	}
	
}
