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

class Index extends BaseRc {

	render() {
		return (
			<div className='p-quantify_myCreated_index'>
				{ this.renderNavBar() }
				{ this.renderFilter() }
				{ this.renderListLabel() }
				{ this.renderList() }
			</div>
		)
	}

	/**
	 * 渲染导航栏
	 */
	renderNavBar() {
		return (
			<NavBar mode="light" 
			    icon={<Icon type="left" />}
			    onLeftClick={ this.maybeBackRouter.bind(this, '/quantify/myCreated') }>
				我参与的奖扣
			</NavBar>
		)
	}

	/**
	 * 渲染过滤栏
	 */
	renderFilter() {
		return (
			<div className='shared-underNavbar'>
				<Rc_Filter />
			</div>
		)
	}

	/**
	 * 渲染列表标签
	 */
	renderListLabel() {
		const rcHeader = (
			<span>
				我参与的奖扣({ this.props.totalNumber })
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
			<Rc_List />
		)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		totalNumber: state.m_quantify.m_myRelated.m_index.totalNumber
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	quantifyEditorActionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)