/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 * @desc:   专审审核人
 */
import {
	NavBar,
	Icon,
	List
} from 'antd-mobile'
import checkerPickerActionType from 'ui/component/checkerPicker/actionType'
import action from './action'

class Checker extends BaseRc {

	render() {
		const reward = this.props.reward
		if (!reward) return null
		const activity = reward.activity
		if (!activity) return null
		if (activity.data.audit != 1) return null
		return (
			<div className='c-checker'>
				<List>
					{ this.renderAttn() }
					{ this.renderAudit() }
				</List>
			</div>
		)
	}

	/**
	 * 渲染初审人
	 */
	renderAttn() {
		const reward = this.props.reward
		const attn = reward.attn
		const extra = (
			attn ? attn.data.name : '请选择'
		)
		return (
			<List.Item extra={ extra }
    			arrow='horizontal'
    			onClick={ this.onPickAttn.bind(this) }>
    			初审人
    		</List.Item>
		)
	}

	/**
	 * 渲染终审人
	 */
	renderAudit() {
		const reward = this.props.reward
		const audit = reward.audit
		const extra = (
			audit ? audit.data.name : '请选择'
		)
		return (
			<List.Item extra={ extra }
    			arrow='horizontal'
    			onClick={ this.onPickAudit.bind(this) }>
    			终审人
    		</List.Item>
		)
	}

	/**
	 * 选择初审人
	 */
	onPickAttn() {
		const reward = this.props.reward
		const index = this.props.index
		const attn = reward.attn
		const audit = reward.audit
		const activity = reward.activity
		const isLockRecommand = (
			activity.data.isAttnLock == 1 &&
			!reward.getOverflow() &&
			!reward.getBelowflow()
		)
		const bindedAttnList = activity.getBindedAttnList()
		this.props[checkerPickerActionType.INIT]({
			checker: attn,
			onSubmit: action.setRewardAttn.bind(undefined, index),
			filter: {
				exclude: audit ? [audit] : []
			},
			isRecommandMode: true,
			recommandList: bindedAttnList,
			isLockRecommand: isLockRecommand
		})
		this.pushRouter('/checkerPicker')
	}

	/**
	 * 选择终审人
	 */
	onPickAudit() {
		const reward = this.props.reward
		const index = this.props.index
		const attn = reward.attn
		const audit = reward.audit
		let exclude = [this.props.me]
		if (attn) {
			exclude.push(attn)
		}
		const activity = reward.activity
		let bindedAuditList = activity.getBindedAuditList()
		bindedAuditList = bindedAuditList.filter(person => person.canCheckReward(reward))
		const isLockRecommand = (
			activity.data.isAuditLock == 1 &&
			bindedAuditList.length &&
			!reward.getOverflow() &&
			!reward.getBelowflow()
		)
		const overflow = reward.getOverflow()
		this.props[checkerPickerActionType.INIT]({
			checker: audit,
			onSubmit: action.setRewardAudit.bind(undefined, index),
			filter: {
				exclude: exclude,
				overflow: overflow
			},
			isRecommandMode: true,
			recommandList: bindedAuditList,
			isLockRecommand: isLockRecommand
		})
		this.pushRouter('/checkerPicker')
	}


}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		quantify: state.m_quantify.m_editor.quantify,
		me: state.m_global.me
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	checkerPickerActionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Checker)