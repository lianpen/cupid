
const QuestionnaireService = require('../service/Questionnaire')

class QuestionnaireController {

	constructor() {}

	/**
	 * 添加问卷
	 */
	insert(body) {
		if (!body) return Promise.resolve()
		let questionList = body.questionList
		if (!questionList || !questionList.length) return Promise.resolve()
		return new Promise(async resolve => {
			let qs = new QuestionnaireService()
			let sr = await qs.insert(body)
			resolve(sr)
		})
	}		

	getList() {
		return new Promise(async resolve => {
			let qs = new QuestionnaireService()
			let sr = await qs.getList()
			resolve(sr)
		})
	}

	getQuestionnaire(query) {
		if (!query) return Promise.resolve()
		let id = query.id
		if (id === null || id === undefined) return Promise.resolve()
		return new Promise(async resolve => {
			let qs = new QuestionnaireService()
			let sr = await qs.getQuestionnaire(id)
			resolve(sr)
		})
	}

}

module.exports = QuestionnaireController