
import BaseModel from './BaseModel'

const dictionary = [
	['id', null, 'id'],
	['type', null, '问题类型 目前都是填字'],
	['title', '', '题目标题'],
	['questionnaireId', null, '所在问卷的id'],
	['authorId', null, '作者的id'],
	['authorName', null, '作者的名字'],
	['createTime', null, '创建时间'],
	['indexInQuestionnaire', 0, '在问卷中的索引'],
	['isAbstracted', false, '是否被提取到列表']
]

class Question extends BaseModel {

	constructor(data) {
		super(dictionary, data)
	}

}

export default Question