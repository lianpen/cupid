
export const state = () => ({
	uuid: 0
})

export const mutations = {
	addUUid(state) {
		state.uuid += 1
	}
}