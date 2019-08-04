
import actionType from './actionType'
import model from 'model'

const initialState = {
	questionnaire: null
}


export default (state = initialState, action) => {
	let data = action.data
	switch(action.type) {
		case actionType.INIT:
			return {
				...state,
				questionnaire: data
			}
		case actionType.RESET:
			return initialState
		default: 
			return state
	}
}