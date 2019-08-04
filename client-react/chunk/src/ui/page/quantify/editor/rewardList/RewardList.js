/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	Flex,
	Button,
	WhiteSpace
} from 'antd-mobile'
import constants from 'global/constants'
import actionType from '../actionType'
import action from './action'
import Rc_Reward from './Reward'
import model from 'model'
import urlUtil from 'util/url'
import Svg_add from 'assets/svg/add.svg'
import respool from 'global/respool'
import './rewardList.less'

class RewardList extends BaseRc {

	render() {
		return (
			<div className='p-quantify-editor-rewardList'>
				{ this.renderNavBar() }
				<div className='shared-underNavbar' />
				{ this.renderRewardList() }
				{ this.renderAddButton() }
				{ this.renderBottomBar() }
			</div>
		)
	}

	/**
	 * 渲染导航栏
	 */
	renderNavBar() {
		const text = (
			this.props.mode == constants.EDIT_MODE.ADD ?
			'添加奖扣' :
			'编辑奖扣'
		)
		return (
			<NavBar mode="light" 
			    icon={<Icon type="left" />}
			    onLeftClick={ this.backRouter }>
			    { text }
			</NavBar>
		)
	}

	/**
	 * 渲染奖扣列表
	 */
	renderRewardList() {
		if (!this.props.quantify) return null
		const rcList = this.props.quantify.rewardList.map((reward, index) => (
			<Rc_Reward reward={ reward } index={ index } />
		))
		return (
			<div className='c-reward-list'>
				{ rcList }
			</div>
		)
	}

	/**
	 * 渲染添加按钮
	 */
	renderAddButton() {
		return (
			<div className='c-addRewardButton'>
				<div className='c-addRewardButton-wrapper'
					onClick={ this.props[actionType.ADD_QUANTIFY_REWARD] }>
					<Svg_add width={ 26 } height= { 26 } className='text-primary' />
					<p>
						添加奖扣事件
					</p>
				</div>
			</div>
		)
	}

	/**
	 * 渲染底部按钮
	 */
	renderBottomBar() {
		return (
			<div className='shared-bottomSubmit c-footer shared-border-top'>
				<Button
					className="shared-bottomSubmit-two_left"
					inline
					onClick={ this.backRouter }>
					取消
				</Button>
				<Button type='primary'
					className="shared-bottomSubmit-two_right"
					inline
					onClick={ this.onSubmit.bind(this) }>
					下一步
				</Button>
			</div>
		)
	}

	/**
	 * 数据提交
	 */
	async onSubmit() {
		if (this.props.pending) return
		this.props[actionType.SET_PENDING](true)
		await action.submit()
		this.props[actionType.SET_PENDING](false)
	}

	componentWillMount() {
		this.init()
		this.prepareActivityTree()
		this.prepareDepartmentTree()
	}

	/**
	 * 初始化
	 * 地址上有id是编辑模式 没有id是新增模式
	 * 新增模式下实例化一个新的quantify
	 * 编辑模式下加载quantify并解析
	 * 2018.6.21
	 * 函数作废 因为移动端和pc端不同的是选人和选事件路由会频繁跳转
	 * 所有无法在mount和unmount时做初始化 要跨模块地在来源按钮做初始化
	 *
	 * 2018.6.22
	 * 为了开发方便 做一次模拟 如果没有奖扣 模拟一个
	 */
	init() {
		if (!this.props.quantify.rewardList.length) {
			this.props[actionType.ADD_QUANTIFY_REWARD]()
		}
	}

	/**
	 * 预准备事件树
	 */
	prepareActivityTree() {
		respool.activityTree.prepare()
	}

	/**
	 * 预准备部门树
	 */
	prepareDepartmentTree() {
		respool.departmentTree.prepare()
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const m_editor = state.m_quantify.m_editor
	return {
		quantify: m_editor.quantify,
		pending: m_editor.pending,
		mode: m_editor.mode
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.INIT,
	actionType.ADD_QUANTIFY_REWARD,
	actionType.SET_PENDING
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RewardList)