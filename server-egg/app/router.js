'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/questionnaire/insert', controller.questionnaire.insert);
  router.get('/questionnaire/get_list', controller.questionnaire.getList);
  router.get('/questionnaire/get_questionnaire', controller.questionnaire.getQuestionnaire);
  router.get('/home/testssr', controller.home.testssr);
};
