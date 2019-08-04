
const QuestionService = require('../service/Question')

class QuestionController {

	constructor() {}

	getQuestion(params) {
		return new Promise(async resolve => {
			let qs = new QuestionService()
			let sr = await qs.getQuestion(id)
			resolve(sr)
		})
	}		

}

module.exports = QuestionController