'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/questionnaire.test.js', () => {

	it('拉列表', async () => {
		const ctx = app.mockContext();
		const list = await ctx.service.questionnaire.getList();
		assert(list);
		assert(list.length);
	});


});