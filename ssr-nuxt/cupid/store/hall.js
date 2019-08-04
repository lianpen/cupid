
export const state = () => ({
	questionnaireList: []
})

export const mutations = {
	setQuestionnaireList(state, questionnaireList) {
		state.questionnaireList = questionnaireList
	}
}