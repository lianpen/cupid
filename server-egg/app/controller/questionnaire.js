'use strict';

const Controller = require('egg').Controller;

class QuestionnaireController extends Controller {

  async getList() {
    const { ctx } = this;
    const list = await ctx.service.questionnaire.getList();
    ctx.body = list;
  }

  async getQuestionnaire() {
    const { ctx } = this;
    const id = ctx.query.id;
    if (!id) {
      ctx.body = {
        success: false,
      };
      return;
    }
    const questionnaire = await ctx.service.questionnaire.getQuestionnaire(ctx.query.id);
    ctx.body = questionnaire;
  }

  async insert() {
    const { ctx } = this;
    try {
      ctx.validate({
        questionList: { type: 'array' },
      });
    } catch (err) {
      ctx.warn(err.errors);
      ctx.body = {
        success: false,
      };
      return;
    }
    const result = await ctx.service.questionnaire.insert(ctx.request.body);
    ctx.body = result;
  }

}

module.exports = QuestionnaireController;
