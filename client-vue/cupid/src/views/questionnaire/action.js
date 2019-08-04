import { makeAction } from '@/utils/vuex'

let prefix = 'views-questionnaire'

let actions = [{
	name: 'initQuestionnaire',
	desc: '初始化问卷'
}]

let module = makeAction(actions, prefix)

export default module