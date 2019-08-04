'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async testssr() {
  	const { ctx } = this;
    const list = await ctx.service.questionnaire.getList();
  	await ctx.render('test0522.nj', { list: list });
  }
}

module.exports = HomeController;
