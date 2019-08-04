
import actionType from './actionType'
import model from 'model'

const initialState = {
	questionnaireList: []
}


export default (state = initialState, action) => {
	let data = action.data
	switch(action.type) {
		case actionType.INIT:
			return {
				...state,
				questionnaireList: data || []
			}
		case actionType.RESET:
			return initialState
		default: 
			return state
	}
}