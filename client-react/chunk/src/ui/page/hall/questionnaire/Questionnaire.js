/*
 * @Author: lianpen
 */

import {
	NavBar,
	Icon,
	List,
	InputItem,
	Button,
	WingBlank
} from 'antd-mobile'
import fn from 'util/fn'
import './questionnaire.less'
import actionType from './actionType'
import model from 'model'
import dateUtil from 'util/date'
import urlUtil from 'util/url'

class Publish extends BaseRc {

	componentWillMount() {
		this.init()
	}

	componentWillUnmount() {
		this.props[actionType.RESET]()
	}
	async init() {
		let data = await this.load()
		let questionnaire = this.parse(data)
		this.props[actionType.INIT](questionnaire)
	}

	/**
	 * 加载数据
	 */
	async load() {
		let id = urlUtil.getValue('id')
		let url = 'http://localhost:3000/questionnaire/get_questionnaire?id=' + id
		let res = await fetch(url)
		let data = await res.json()
		return data
	}

	/**
	 * 解析数据成对象
	 */
	parse(data) {
		if (!data) return null
		let questionnaire = new model.Questionnaire(data)
		let questionListData = data.questionList || []
		questionnaire.questionList = questionListData.map(o => new model.Question(o))
		return questionnaire
	}	

	render() {
		return (
			<div className='p-hall-questionnaire'>
				{ this.renderNavBar() }
				{ this.renderQuestionnaire() }
				{ this.renderQuestionList() }
			</div>
		)
	}

	/**
	 * navbar
	 */
	renderNavBar() {
		return (
			<NavBar mode="light" 
				icon={ <Icon type="left" /> }
				onLeftClick={ this.backRouter.bind(this) }
				className='p-navbar'>
				问卷详情
			</NavBar>
		)
	}

	/**
	 * 渲染问卷信息
	 */
	renderQuestionnaire() {
		let questionnaire = this.props.questionnaire
		if (!questionnaire) return null
		let {
			createTime
		} = questionnaire
		let date = new Date(parseInt(createTime))
		let dateStr = dateUtil.format(date, 'yyyy-MM-dd hh-mm')
		return (
			<div className='p-naire shared-underNavbar'>
				<h3>
					{ questionnaire.authorName } 发起的问卷
				</h3>
				<p>
					发起时间: { dateStr }
				</p>
			</div>
		)
	}

	/**
	 * 渲染问题列表
	 */
	renderQuestionList() {
		let questionnaire = this.props.questionnaire
		if (!questionnaire) return null
		let questionList = questionnaire.questionList
		return (
			<div className='p-body'>
				<List>
					{
						questionList.map((question, index) => this.renderQuestion(question, index))
					}
	        	</List>
        	</div>
		)
	}

	/**
	 * 渲染单个问题
	 */
	renderQuestion(question, index) {
		return (
	        <List.Item multipleLine>
	        	问题{ index + 1 }：
	        	{ question.title }
	        </List.Item>
		)
	}

}
import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	let o = state.m_hall.m_questionnaire
	let questionnaire = o.questionnaire
	return {
		questionnaire: questionnaire
	}
}
const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.INIT,
	actionType.RESET
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Publish)