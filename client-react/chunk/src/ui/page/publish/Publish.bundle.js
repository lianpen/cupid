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
import './publish.less'
import actionType from './actionType'

class Publish extends BaseRc {

	componentWillMount() {
		this.init()
	}

	init() {
		this.props[actionType.INIT]()
	}

	render() {
		return (
			<div className='p-publish'>
				{ this.renderNavBar() }
				{ this.renderBody() }
				{ this.renderSubmit() }
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
				className='p-navbar'
				rightContent={ this.renderNavBarRight() }>
				发布问卷
			</NavBar>
		)
	}

	/**
	 * navbarRight
	 */
	renderNavBarRight() {
		return (
			<Icon type="ellipsis" onClick={ this.onAddQuestion.bind(this)} />
		)
	}

	/**
	 * 添加问题
	 */
	onAddQuestion() {
		this.props[actionType.ADD_QUESTION]()
	}

	/**
	 * 问题列表
	 */
	renderBody() {
		let questionnaire = this.props.questionnaire
		if (!questionnaire) return null
		return (
			<div className='shared-underNavbar p-body'>
				<List>
					{
						questionnaire.questionList.map((question, index) => {
							return this.renderQuestion(question, index)
						})
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
			<InputItem value={ question.title }
				onChange={ this.onChangeQuestion.bind(this, question) }>
				问题{ index + 1 }
			</InputItem>
		)
	}

	/**
	 * 问题改变
	 */
	onChangeQuestion(question, value) {
		this.props[actionType.SET_QUESTION_TITLE]({
			question,
			title: value
		})
	}

	/**
	 * 渲染提交
	 */
	renderSubmit() {
		return (
			<div className='p-submit'>
				<WingBlank>
					<Button type="primary" onClick={ this.onSubmit.bind(this) }>提交</Button>
				</WingBlank>
			</div>
		)
	}

	/**
	 * 提交数据
	 */
	async onSubmit() {
		let url = 'http://localhost:3000/questionnaire/insert'
		let params = this.makeSubmitParams()
		let res = await fetch(url, {
		    method: 'POST',
		    headers: {
		    	'content-type': 'application/json'
		    },
		    body: JSON.stringify(params)
		})
		let text = await res.text()
		console.log(text)
	}

	/**
	 * 计算提交参数
	 */
	makeSubmitParams() {
		let questionnaire = this.props.questionnaire
		let questionList = questionnaire.questionList.map(question => {
			return {
				title: question.title
			}
		})
		return {
			questionList: questionList
		}
	}

}
import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	let o = state.m_publish
	let questionnaire = o.questionnaire
	return {
		questionnaire: questionnaire,
		rid: questionnaire && questionnaire.rid
	}
}
const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.INIT,
	actionType.SET_QUESTION_TITLE,
	actionType.ADD_QUESTION
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Publish)