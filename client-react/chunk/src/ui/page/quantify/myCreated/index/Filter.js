/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	Flex,
	Menu,
	Icon,
	Toast
} from 'antd-mobile'
import moment from 'moment'
import action from './action'
import constants from 'global/constants'
import actionType from './actionType'

class Filter extends BaseRc {

	constructor(props) {
		super(props)
		this.state = {
			/**
			 * 显示时间弹出
			 */
			isShowTime: false,
			/**
			 * 显示状态弹出
			 */
			isShowStatus: false
		}
	}

	render() {
		return (
			<div>
				<Flex justify="center" className='shared-dropMenu'>
					<Flex.Item onClick={ this.onClickTime.bind(this) }>
			      		<div className='shared-dropMenu-item'>
			      			{ this.renderTimeDropMenuItem() }
			      		</div>
			      	</Flex.Item>
					<Flex.Item onClick={ this.onClickStatus.bind(this) }>
			      		<div className='shared-dropMenu-item'>
			      			{ this.renderStatusDropMenuItem() }
			      		</div>
			      	</Flex.Item>
					<Flex.Item>
			      		<div className='shared-dropMenu-item' 
			      			onClick={ this.pushRouter.bind(this, '/quantify/myCreated/screen') }>
			      			高级筛选
			      		</div>
			      	</Flex.Item>
			    </Flex>
	      		{ this.renderTimeMenu() }
	      		{ this.renderStatusMenu() }
		    </div>
		)
	}

	/**
	 * 渲染时间下拉菜单项
	 */
	renderTimeDropMenuItem() {
		let text = '全部时间'
		const time = this.props.filter.time
		if (time !== constants.ALL) {
			text = time
		}
		const iconType = this.state.isShowTime ? 'up' : 'down'
		const rcIcon = (
			<Icon type={ iconType } size='xxs' />
		)
		return [
			text,
			rcIcon
		]
	}

	/**
	 * 渲染状态下拉菜单项
	 */
	renderStatusDropMenuItem() {
		let text = '全部状态'
		const status = this.props.filter.status
		if (status !== constants.ALL) {
			const c = [
				'AT_PREPARE',
				'TO_FIRST_CHECK',
				'TO_FINAL_CHECK',
				'PASSED'
			].find(s => {
				return constants.CHECK_STATUS[s] == status
			})
			text = constants.CHECK_STATUS_TEXT[c]
		}
		const iconType = this.state.isShowStatus ? 'up' : 'down'
		const rcIcon = (
			<Icon type={ iconType } size='xxs' />
		)
		return [
			text,
			rcIcon
		]
	}

	/**
	 * 点击时间选择
	 */
	onClickTime() {
		this.setState({
			isShowTime: !this.state.isShowTime,
			isShowStatus: false
		})
	}

	/**
	 * 点击状态选择
	 */
	onClickStatus() {
		this.setState({
			isShowTime: false,
			isShowStatus: !this.state.isShowStatus
		})
	}

	/**
	 * 渲染时间菜单
	 */
	renderTimeMenu() {
		if (!this.state.isShowTime) return null
		const momentList = this.getMomentList()
		const data = momentList.map(momentIns => {
			const value = momentIns.format('YYYY-MM')
			return {
				value: value,
				label: value
			}
		})
		data.unshift({
			value: constants.ALL,
			label: '全部时间'
		})
		return [(
			<Menu
		        className = "shared-menu"
		        data = { data }
		        value = { [this.props.filter.time] } 
		        onChange = { this.onChangeTime.bind(this) }
		        level = { 1 } />
		), (
			<div className="shared-menu-mask" onClick={ this.onMaskClick.bind(this) } style={{ top: 89 }} />
		)]
	}

	/**
	 * 获取moment列表
	 */
	getMomentList() {
		const thisMonth = moment()
		let result = []
		for (let i = 0; i < 8; i += 1) {
			let momentIns = thisMonth.clone().subtract(i, 'months')
			result.push(momentIns)
		}
		return result
	}

	/**
	 * 渲染状态菜单
	 */
	renderStatusMenu() {
		if (!this.state.isShowStatus) return null
		const data = [{
			value: constants.ALL,
			label: '全部状态'
		}, {
			value: constants.CHECK_STATUS.AT_PREPARE,
			label: constants.CHECK_STATUS_TEXT.AT_PREPARE
		}, {
			value: constants.CHECK_STATUS.TO_FIRST_CHECK,
			label: constants.CHECK_STATUS_TEXT.TO_FIRST_CHECK
		}, {
			value: constants.CHECK_STATUS.TO_FINAL_CHECK,
			label: constants.CHECK_STATUS_TEXT.TO_FINAL_CHECK
		}, {
			value: constants.CHECK_STATUS.PASSED,
			label: constants.CHECK_STATUS_TEXT.PASSED
		}]
		return [(
			<Menu
		        className = "shared-menu"
		        data = { data }
		        value = { [this.props.filter.status] } 
		        onChange = { this.onChangeStatus.bind(this) }
		        level = { 1 } />
		), (
			<div className="shared-menu-mask" onClick={ this.onMaskClick.bind(this) } style={{ top: 89 }} />
		)]
	}

	/**
	 * 点击蒙版
	 */
	onMaskClick() {
		this.setState({
			isShowTime: false,
			isShowStatus: false
		})
	}
	/**
	 * 选择过滤时间
	 */
	async onChangeTime(value) {
		if (!value || !value.length) return
		this.setState({
			isShowTime: false,
			isShowStatus: false
		})
		Toast.loading('', 0)
		this.props[actionType.SET_FILTER_TIME](value[0])
		this.props[actionType.RESET_FETCH_LIST_0]()
		const data = await action.fetchList()
		this.props[actionType.RESET_FETCH_LIST_1](data)
		Toast.hide()
	}

	/**
	 * 选择过滤状态
	 */
	async onChangeStatus(value) {
		if (!value || !value.length) return
		this.setState({
			isShowTime: false,
			isShowStatus: false
		})
		Toast.loading('', 0)
		this.props[actionType.SET_FILTER_STATUS](value[0])
		this.props[actionType.RESET_FETCH_LIST_0]()
		const data = await action.fetchList()
		this.props[actionType.RESET_FETCH_LIST_1](data)
		Toast.hide()
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const mStore = state.m_quantify.m_myCreated.m_index
	return {
		filter: mStore.filter
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.SET_FILTER_TIME,
	actionType.SET_FILTER_STATUS,
	actionType.RESET_FETCH_LIST_0,
	actionType.RESET_FETCH_LIST_1
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filter)