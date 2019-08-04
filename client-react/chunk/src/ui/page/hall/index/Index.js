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
import './index.less'
import actionType from './actionType'
import model from 'model'
import dateUtil from 'util/date'

class Publish extends BaseRc {

	componentWillMount() {
		this.init()
	}

	componentWillUnmount() {
		this.props[actionType.RESET]()
	}

	async init() {
		let data = await this.load()
		let questionnaireList = this.parse(data)
		this.props[actionType.INIT](questionnaireList)
	}

	/**
	 * 加载数据
	 */
	async load() {
		let url = 'http://localhost:3000/questionnaire/get_list'
		let res = await fetch(url)
		let data = await res.json()
		return data
	}

	/**
	 * 解析数据成对象
	 */
	parse(data) {
		if (!data || !data.length) return []
		let questionnaireList = data.map(o => {
			return new model.Questionnaire(o)
		})
		return questionnaireList
	}	

	render() {
		return (
			<div className='p-hall-index'>
				{ this.renderNavBar() }
				{ this.renderBody() }
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
				大厅
			</NavBar>
		)
	}

	/**
	 * 问题列表
	 */
	renderBody() {
		let questionnaireList = this.props.questionnaireList || []
		return (
			<div className='shared-underNavbar p-body'>
				<List renderHeader={() => '问卷大厅'} className="my-list">
					{
						questionnaireList.map(questionnaire => this.renderQuestionnaire(questionnaire))
					}
	        	</List>
        	</div>
		)
	}

	/**
	 * 渲染单个问卷
	 */
	renderQuestionnaire(questionnaire) {
		return (
	        <List.Item arrow="horizontal" 
	        	multipleLine 
	        	onClick={ this.onClickQuestionnaire.bind(this, questionnaire) }>
	          	{ this.makeTitle(questionnaire) }
	          	{
	          		this.makeBriefList(questionnaire).map(text => {
	          			return (
	          				<List.Item.Brief>
	          					{ text }
	          				</List.Item.Brief>
	          			)
	          		})
	          	}
	        </List.Item>
		)
	}

	/**
	 * 问卷点击
	 */
	onClickQuestionnaire(questionnaire) {
		this.pushRouter('/hall/questionnaire?id=' + questionnaire.id)
	}

	/**
	 * 计算单个问卷的标题
	 */
	makeTitle(questionnaire) {
		let {
			authorName,
			createTime
		} = questionnaire
		let date = new Date(parseInt(createTime))
		let dateStr = dateUtil.format(date, 'yyyy-MM-dd hh-mm')
		return authorName + ' ' + dateStr
	}
	makeBriefList(questionnaire) {
		let abstract = questionnaire.abstract
		let o = JSON.parse(abstract)
		if (!o.length) o = []
		return o
	}


}
import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	let o = state.m_hall.m_index
	let questionnaireList = o.questionnaireList
	return {
		questionnaireList: questionnaireList,
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