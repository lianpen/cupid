
const UserService = require('../service/User')

class UserController {

	constructor() {}

	imitate100Users() {
		return new Promise(async resolve => {
			let us = new UserService()
			let sr = await us.imitate100Users()
			resolve(sr)
		})
	}		

}

module.exports = UserController