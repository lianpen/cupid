/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	Flex,
	List,
	Menu
} from 'antd-mobile'
import constants from 'global/constants'
import model from 'model'
import Rc_Filter from './Filter'
import Rc_List from './List'
import quantifyEditorActionType from 'ui/page/quantify/editor/actionType'
import Svg_add from 'assets/svg/reward_add.svg'

class Index extends BaseRc {

	render() {
		return (
			<div className='p-quantify_myCreated_index'>
				{ this.renderNavBar() }
				<div className="sharf-fixed-box">
					{ this.renderFilter() }
					{ this.renderLinkToMyRelated() }
					{ this.renderListLabel() }
				</div>
				{ this.renderList() }
			</div>
		)
	}

	/**
	 * 渲染导航栏
	 */
	renderNavBar() {
		const rc_rightContent = (
			<span onClick={ this.onClickEditor.bind(this) }>
				<Svg_add width={ 18 } height={ 18 } className="text-white" />
			</span>
		)
		return (
			<NavBar mode="light" 
			    icon={<Icon type="left" />}
			    onLeftClick={ this.maybeBackRouter.bind(this, '/stage') }
			    rightContent={ rc_rightContent }>
				我的奖扣
			</NavBar>
		)
	}

	/**
	 * 渲染过滤栏
	 */
	renderFilter() {
		return (
			<Rc_Filter />
		)
	}

	/**
	 * 渲染链接到我参与的奖扣
	 */
	renderLinkToMyRelated() {
		return (
			<List className='shared-link'
				onClick={ this.pushRouter.bind(this, '/quantify/myRelated') }>
	        	<List.Item arrow="horizontal">我参与的奖扣</List.Item>
	      	</List>
		)
	}

	/**
	 * 渲染列表标签
	 */
	renderListLabel() {
		const rcHeader = (
			<span>
				我提交的奖扣({ this.props.totalNumber })
			</span>
		)
		return (
			<List renderHeader={ rcHeader } />
		)
	}

	/**
	 * 渲染列表
	 */
	renderList() {
		return (
			<div style={{ marginTop: 180 }}>
				<Rc_List />
			</div>
		)
	}

	/**
	 * 添加奖扣
	 */
	onClickEditor() {
		const quantify = new model.Quantify()
		quantify.addNewReward()
		this.props[quantifyEditorActionType.INIT]({
			mode: constants.EDIT_MODE.ADD,
			quantify: quantify
		})
		this.pushRouter('/quantify/editor')
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		totalNumber: state.m_quantify.m_myCreated.m_index.totalNumber
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	quantifyEditorActionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)