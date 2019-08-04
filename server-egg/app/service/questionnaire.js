const Service = require('egg').Service;

class QuestionnaireService extends Service {

	  async find(uid) {
	    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
	    return user;
	  }

  /**
	 * 获取列表
	 */
  async getList() {
    const results = await this.app.mysql.select('questionnaire');
    return results;
  }

  /**
	 * 获取详情
	 */
  async getQuestionnaire(id) {
    const questionnaire = await this.app.mysql.get('questionnaire', { id });
    if (!questionnaire) return null;
    const questionList = await this.app.mysql.select('question', {
      where: {
        questionnaire_id: id,
      },
    });
    questionnaire.questionList = questionList;
    return questionnaire;
  }

  /**
	 * 添加问卷
	 * 事务
	   1. 添加一条questionnaire 得到id
	   2. 添加若干条question
	 */
  async insert(body) {
    const questionnaireId = await this._insertQuestionnaire(body);
    const result = await this._insertQuestionList(body, questionnaireId);
    return result;
  }
  async _insertQuestionnaire(body) {
    let abstract = body.questionList.slice(0, 3).map(question => question.title);
    abstract = JSON.stringify(abstract);
    const result = await this.app.mysql.insert('questionnaire', {
      author_id: 13,
      author_name: '丁薛祥',
      create_time: new Date().getTime(),
      title: '',
      abstract,
    });
    return result.insertId;
  }
  async _insertQuestionList(body, questionnaireId) {
    const now = new Date().getTime();
    const data = body.questionList.map((question, index) => {
      return {
        author_id: 13,
        author_name: '丁薛祥',
        type: '',
        title: question.title,
        questionnaire_id: questionnaireId,
        create_time: now,
        index_in_questionnaire: index,
        is_abstracted: index <= 2,
      };
    });
    const result = await this.app.mysql.insert('question', data);
    return result;
  }

}

module.exports = QuestionnaireService;
