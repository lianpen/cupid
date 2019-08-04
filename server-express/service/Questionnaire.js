const Service = require('./Service')

class QuestionnaireService extends Service {

	constructor() {
		super()
	}

	/**
	 * 添加问卷
	 * 事务
	   1. 添加一条questionnaire 得到id
	   2. 添加若干条question
	 */
	insert(body) {
		let conn = this.getConn()
		return new Promise(async resolve => {
			conn.connect()
			let questionnaireId = await insertQuestionnaire(conn, body)
			if (questionnaireId === 'error') {
				conn.end()
				resolve('error') 
			}
			let r = await insertQuestionList(conn, body, questionnaireId)
			if (r === 'error') {
				resolve('error')
			}
			conn.end()
			resolve('ok')
		})
		function insertQuestionnaire(conn, body) {
			return new Promise(resolve => {
				let sql = 'INSERT INTO questionnaire(author_id, author_name, create_time, title, abstract) VALUES(?, ?, ?, ?, ?)'
				let params = getParams(body)
				conn.query(sql, params, (err, result) => {
					if(err) {
						console.log('[INSERT ERROR] - ',err.message)
						resolve('error')
					}    
					resolve(result.insertId)
				})
			})
			function getParams(body) {
				let now = new Date().getTime()
				let title = ''
				let abstract = body.questionList.slice(0, 3).map(question => question.title)
				abstract = JSON.stringify(abstract)
				return [13, '丁薛祥', now, title, abstract]
			}
		}
		function insertQuestionList(conn, body, questionnaireId) {
			return new Promise(resolve => {
				let sql = `
					INSERT INTO question(
						author_id, 
						author_name, 
						type, 
						title, 
						questionnaire_id,
						create_time,
						index_in_questionnaire,
						is_abstracted
					) VALUES ?
				`
				let params = getParams(body, questionnaireId)
				conn.query(sql, [params], (err, result) => {
					if(err) {
						console.log('[INSERT ERROR] - ',err.message)
						resolve('error')
					}    
					resolve()
				})
			})
			function getParams(body, questionnaireId) {
				let now = new Date().getTime()
				return body.questionList.map((question, index) => {
					return [
						13,
						'丁薛祥',
						'',
						question.title,
						questionnaireId,
						now,
						index,
						index <= 2
					]
				})
			}
		}
	}		

	/**
	 * 获取列表
	 */
	getList() {
		let conn = this.getConn()
		return new Promise(async resolve => {
			conn.connect()
			let result = await query(conn)
			conn.end()
			resolve(result)
		})
		function query(conn) {
			return new Promise(resolve => {
				let sql = 'select * from questionnaire'
				conn.query(sql, (err, result) => {
					if(err) {
						console.log(err.message)
						resolve('error')
					}    
					resolve(result)
				})
			})
		}
	}

	/**
	 * 获取详情
	 */
	getQuestionnaire(id) {
		let conn = this.getConn()
		return new Promise(async resolve => {
			conn.connect()
			let qs = await queryQuestionnaire(conn, id)
			if (qs.length != 1) {
				resolve('error')
			}
			let questionnaire = qs[0]
			let questionList = await queryQuestionList(conn, id)
			questionnaire.questionList = questionList
			conn.end()
			resolve(questionnaire)
		})
		function queryQuestionnaire(conn, id) {
			return new Promise(resolve => {
				let sql = 'select * from questionnaire where id = ' + id
				var query = conn.query(sql, function (error, result) {
					if (error) {
						resolve(error)
					}
					resolve(result)
				})
			})
		}
		function queryQuestionList(conn, id) {
			return new Promise(resolve => {
				let sql = 'select * from question where questionnaire_id = ' + id
				var query = conn.query(sql, function (error, result) {
					if (error) {
						resolve(error)
					}
					resolve(result)
				})
			})
		}
	}

}

module.exports = QuestionnaireService