'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/questionnaire.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET questionnaire/get_list', () => {
    return app.httpRequest()
      .get('/questionnaire/get_list')
      .expect(200);
  });

  it('should GET questionnaire/get_questionnaire', () => {
    return app.httpRequest()
      .get('/questionnaire/get_questionnaire?id=8')
      .expect(200);
  });


});