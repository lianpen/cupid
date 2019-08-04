
import baseModel from './baseModel'
import questionModel from './question'

const dictionary = [
	['id', null, 'id'],
	['title', '', '标题'],
	['authorId', null, '作者的id'],
	['authorName', null, '作者的名字'],
	['createTime', null, '创建时间'],
	['abstract', '', '摘要']
]

export default {
	init(data) {
		return baseModel.init(dictionary, data)
	},
	getQuestionListForPublish() {
		let questionList = [
			questionModel.init({ title: '今天你穿了什么颜色的内裤?' }),
			questionModel.init({ title: 'what color pants are you wearing today?' }),
			questionModel.init({ title: '오늘 뭐 공부 해요?' }),
		]
		return questionList
	},
	getAbstract(questionList) {
		let ql = questionList.slice(0, 2)
		let tl = ql.map(question => question.title)
		return tl
	}
}