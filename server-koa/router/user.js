
const UserController = require('./controller/User')

/**
 * 模拟100个用户
 */
app.get('/user/imitate_100_users', async (req, res) => {
	let controller = new UserController()
	let cr = await controller.imitate100Users()
	res.send(cr)
})