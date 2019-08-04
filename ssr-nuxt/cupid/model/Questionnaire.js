
import BaseModel from './BaseModel'
import model from 'model'

const dictionary = [
	['id', null, 'id'],
	['title', '', '标题'],
	['authorId', null, '作者的id'],
	['authorName', null, '作者的名字'],
	['createTime', null, '创建时间'],
	['abstract', '', '摘要']
]

class Questionnaire extends BaseModel {

	constructor(data) {
		super(dictionary, data)
		/**
		 * 问题列表
		 */
		this.questionList = []
	}

	/**
	 * 发布时初始化一个问卷
	 */
	initializeForPublish() {
		this.questionList = [
			new model.Question(),
			new model.Question(),
			new model.Question()
		]
		this.questionList[0].title = '今天你穿了什么颜色的内裤?'
		this.questionList[1].title = 'what color pants are you wearing today?'
		this.questionList[2].title = '오늘 뭐 공부 해요?'
	}

	/**
	 * 添加一个问题
	 */
	addQuestion() {
		this.questionList.push(new model.Question())
	}

	/**
	 * 计算摘要
	 */
	makeAbstract() {
		let ql = this.questionList.slice(0, 2)
		let tl = ql.map(question => question.title)
		return tl
	}

}

export default Questionnaire