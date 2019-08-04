const app = require('./app')
const UserController = require('./controller/User')
const QuestionnaireController = require('./controller/Questionnaire')
const QuestionController = require('./controller/Question')

/**
 * 模拟100个用户
 */
app.get('/user/imitate_100_users', async (req, res) => {
	let controller = new UserController()
	let cr = await controller.imitate100Users()
	res.send(cr)
})

/**
 * 添加问卷
 */
app.post('/questionnaire/insert', async (req, res) => {
	let controller = new QuestionnaireController()
	let cr = await controller.insert(req.body)
	res.send(cr)
})

/**
 * 添加问卷 测试get
 */
app.get('/questionnaire/insert', async (req, res) => {

	res.send('to do1')
})

/**
 * 查询问卷列表
 */
app.get('/questionnaire/get_list', async (req, res) => {
	let controller = new QuestionnaireController()
	await timeoutPro()
	let cr = await controller.getList()
	res.send(cr)
})

function timeoutPro() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, 4000)
	})
}

/**
 * 查询问卷详情
 */
app.get('/questionnaire/get_questionnaire', async (req, res) => {
	let controller = new QuestionnaireController()
	let cr = await controller.getQuestionnaire(req.query)
	res.send(cr)
})