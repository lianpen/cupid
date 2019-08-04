/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	List
} from 'antd-mobile'
import activityPickerActionType from 'ui/component/activityPicker/actionType'
import actionType from '../actionType'
import action from './action'

class Activity extends BaseRc {

	render() {
		return (
			<div className='c-activity'>
				{ this.renderTitle() }
				{ this.renderInfo() }
			</div>
		)
	}

	/**
	 * 渲染标题
	 */
	renderTitle() {
		const rc_extra = (
			<a onClick={ this.onRemoveReward.bind(this) }>
				删除
			</a>
		)
		const activity = this.props.reward.activity
		const rcListItemBody = (
			activity ?
			activity.data.eventName :
			(
				<span style={{ color: '#999' }}>
					请输入事件
				</span>
			)
		)
		return (
			<List className='c-activity-title'>
        		<List.Item extra={ rc_extra }
        			onClick={ this.onPickActivity.bind(this) }>
        			{ this.props.index + 1 + '. ' }
        			{ rcListItemBody }
        		</List.Item>
      		</List>
		)
	}

	/**
	 * 选择事件
	 */
	onPickActivity() {
		const quantify = this.props.quantify
		const reward = this.props.reward
		const rewardIndex = quantify.rewardList.indexOf(reward)
		this.props[activityPickerActionType.INIT]({
			activity: reward.activity,
			onSubmit: action.setRewardActivity.bind(undefined, rewardIndex)
		})
		this.pushRouter('/activityPicker')
	}

	/**
	 * 删除奖扣
	 */
	onRemoveReward(event) {
		event.stopPropagation()
		this.props[actionType.REMOVE_QUANTIFY_REWARD](this.props.index)
	}

	/**
	 * 渲染信息
	 */
	renderInfo() {
		const reward = this.props.reward
		const activity = reward.activity
		if (!activity) return null
		return (
			<div className='c-activity-info'>
				{ this.renderDic() }
				{ this.renderRange() }
			</div>
		)
	}

	/**
	 * 渲染目录
	 */
	renderDic() {
		const {
			normName,
			typeName
		} = this.props.reward.activity.data
		let dic = normName
		if (typeName) {
			dic = dic + ' / ' + typeName
		}
		return (
			<p>
				{ dic }
			</p>
		)
	}

	/**
	 * 渲染分值范围
	 */
	renderRange() {
		const {
			ascoreMax,
			ascoreMin,
			bscoreMax,
			bscoreMin,
			opscoreMax,
			opscoreMin
		} = this.props.reward.activity.data
		let textAry = []
		if (bscoreMin || bscoreMax) {
			textAry.push('B ' + bscoreMin + '~' + bscoreMax)
		}
		if (ascoreMin || ascoreMax) {
			textAry.push('A ' + bscoreMin + '~' + bscoreMax)
		}
		if (opscoreMin || opscoreMax) {
			textAry.push('产值 ' + bscoreMin + '~' + bscoreMax)
		}
		if (!textAry.length) return null
		return (
			<p>
				分值范围：
				{ 
					textAry.map(text => (
						<span style={{ marginRight: 10 }}>
							{ text }
						</span>
					)) 
				}
			</p>
		)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		quantify: state.m_quantify.m_editor.quantify
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	activityPickerActionType.INIT,
	actionType.SET_QUANTIFY_REWARD_ACTIVITY,
	actionType.REMOVE_QUANTIFY_REWARD
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Activity)