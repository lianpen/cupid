
import actionType from './actionType'
import model from 'model'

const initialState = {
	questionnaire: null
}


export default (state = initialState, action) => {
	let data = action.data
	switch(action.type) {
		case actionType.INIT:
			let questionnaire = new model.Questionnaire()
			questionnaire.initializeForPublish()
			return {
				...state,
				questionnaire: questionnaire
			}
		case actionType.SET_QUESTION_TITLE:
			let { question, title } = data
			question.title = title
			state.questionnaire.changed()
			return {
				...state
			}
		case actionType.ADD_QUESTION:
			state.questionnaire.addQuestion()
			state.questionnaire.changed()
			return {
				...state
			}
		default: 
			return state
	}
}