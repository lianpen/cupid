/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	List,
	Switch
} from 'antd-mobile'
import personPickerActionType from 'ui/component/personPicker/actionType'
import action from './action'
import actionType from '../actionType'
import Rc_Quick from './quick/Quick'

class RecordHelper extends BaseRc {

	render() {
		return (
			<div className='c-recordHelper'>
				{ this.renderTitle() }
				{ this.renderToggle() }
				{ this.renderQuick() }
			</div>
		)
	}

	/**
	 * 渲染标题
	 */
	renderTitle() {
		const recordNumber = this.props.reward.recordList.length
		const rc_extra = recordNumber ? recordNumber + '人' : '请选择'
		return (
			<List className='c-recordHelper-title'>
        		<List.Item extra={ rc_extra }
        			arrow="horizontal"
        			onClick={ this.onClickPickPerson.bind(this) }>
        			添加人员
        			{ this.renderAddMe() }
        		</List.Item>
      		</List>
		)
	}

	/**
	 * 渲染添加本人
	 */
	renderAddMe() {
		const me = this.props.me
		const recordList = this.props.reward.recordList
		const added = recordList.some(record => record.person.data.id == me.data.id)
		if (added) {
			return (
				<a className='on'
					onClick={ this.onRemoveMe.bind(this) }>
					已添加本人
				</a>
			)
		} else {
			return (
				<a onClick={ this.onAddMe.bind(this) }>
					添加本人
				</a>
			)
		}
	}

	/**
	 * 添加本人
	 */
	onAddMe(event) {
		event.stopPropagation()
		const recordList = this.props.reward.recordList
		const rewardIndex = this.props.index
		const quickRecord = this.props.uiList[rewardIndex].quickRecord
		const me = this.props.me
		const personList = recordList.map(record => record.person)
		personList.unshift(me)
		this.props[actionType.SET_QUANTIFY_REWARD_PROPS]({
			rewardIndex: rewardIndex,
			props: {
				personList: personList,
				quickRecord: quickRecord
			}
		})
	}

	/**
	 * 删除本人
	 */
	onRemoveMe(event) {
		event.stopPropagation()
		const recordList = this.props.reward.recordList
		const rewardIndex = this.props.index
		const quickRecord = this.props.uiList[rewardIndex].quickRecord
		const me = this.props.me
		const personList = recordList.filter(record => (
			record.person.data.id != me.data.id
		)).map(record => record.person)
		this.props[actionType.SET_QUANTIFY_REWARD_PROPS]({
			rewardIndex: rewardIndex,
			props: {
				personList: personList,
				quickRecord: quickRecord
			}
		})
	}

	/**
	 * 选择人员
	 */
	onClickPickPerson() {
		const quantify = this.props.quantify
		const reward = this.props.reward
		const rewardIndex = quantify.rewardList.indexOf(reward)
		this.props[personPickerActionType.INIT]({
			personList: reward.recordList.map(record => record.person),
			onSubmit: action.setRewardPersonList.bind(undefined, rewardIndex)
		})
		this.pushRouter('/personPicker')
	}

	/**
	 * 渲染A分产值切换
	 */
	renderToggle() {
		const ui = this.props.uiList[this.props.index]
		const rc_extra = (
			<Switch checked={ ui.useAAndOp } />
		)
		return (
			<List className='c-recordHelper-toggle'>
        		<List.Item extra={ rc_extra } onClick={ this.onClickToggle.bind(this) }>
        			A分/产值
        		</List.Item>
      		</List>
		)
	}

	/**
	 * 点击A分/产值切换
	 */
	onClickToggle() {
		this.props[actionType.TOGGLE_UI_USEAANDOP]({
			uiIndex: this.props.index
		})
	}

	/**
	 * 渲染快捷设置
	 */
	renderQuick() {
		const {
			index,
			quantify
		} = this.props
		const reward = quantify.rewardList[index]
		if (reward.recordList.length <= 1) return null
		return (
			<Rc_Quick reward={ reward } 
				rewardIndex={ index } />
		)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		me: state.m_global.me,
		quantify: state.m_quantify.m_editor.quantify,
		uiList: state.m_quantify.m_editor.uiList
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	personPickerActionType.INIT,
	actionType.TOGGLE_UI_USEAANDOP,
	actionType.SET_QUANTIFY_REWARD_PROPS
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecordHelper)