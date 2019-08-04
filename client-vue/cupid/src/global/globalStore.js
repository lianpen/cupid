export default {
	state: {
		user: null
	},
	mutations: {
		initUser(user) {
			state.user = user
		}
	}
}