
const app = require('../app')
const Route = require('koa-route')
const QuestionnaireController = require('../controller/Questionnaire')
/**
 * 添加问卷
 */
app.use(Route.post('/questionnaire/insert', async ctx => {
	let controller = new QuestionnaireController()
	let cr = await controller.insert(ctx.request.body)
	ctx.body = cr
}))

/**
 * 查询问卷列表
 */
app.use(Route.get('/questionnaire/get_list', async ctx => {
	let controller = new QuestionnaireController()
	let cr = await controller.getList()
	ctx.body = cr
}))

/**
 * 查询问卷详情
 */
app.use(Route.get('/questionnaire/get_questionnaire', async ctx => {
	let controller = new QuestionnaireController()
	let cr = await controller.getQuestionnaire(ctx.query)
	ctx.body = cr
}))