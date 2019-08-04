let mutations = {}

let module = {
	state: {
		questionnaire: null
	},
	mutations: mutations
}

import action from './action'

/**
 * 初始化问卷
 */
mutations[action.initQuestionnaire] = (state, questionnaire) => {
	state.questionnaire = questionnaire
}

export default module