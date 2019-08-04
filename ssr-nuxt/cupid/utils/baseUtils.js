import axios from 'axios'

export default {
	noop: () => {},
	request: async (action, params) => {
		let url = 'http://localhost:3000/' + action
		try{
			let res = await axios(url, params)
			return res
		}catch(e){
			console.log('request error:' + url + e)
			return null
		}
	}
}