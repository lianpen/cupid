/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	List
} from 'antd-mobile'
import actionType from '../../actionType'
import checkerPickerActionType from 'ui/component/checkerPicker/actionType'
import action from '../action'

class Checker extends BaseRc {

	render() {
		if (!this.isQuantifyCheckable()) return null
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
	 * 是否渲染初审人和终审人
	 * 当所有reward都是专审时 不显示
	 * 否则 显示
	 */
	isQuantifyCheckable() {
		const quantify = this.props.quantify
		return quantify.rewardList.some(reward => {
			if (!reward.activity) return false
			return reward.activity.data.audit != 1
		})
	}

	/**
	 * 渲染初审人
	 */
	renderAttn() {
		const quantify = this.props.quantify
		const attn = quantify.attn
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
		const quantify = this.props.quantify
		const audit = quantify.audit
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
	 * 初审人不能是终审人
	 * 初审人不能是抄送让你
	 */
	onPickAttn() {
		const quantify = this.props.quantify
		const attn = quantify.attn
		let exclude = []
		if (quantify.audit) {
			exclude.push(quantify.audit)
		}
		if (quantify.copy) {
			exclude.push(quantify.copy)
		}
		this.props[checkerPickerActionType.INIT]({
			checker: attn,
			onSubmit: action.setAttn,
			filter: {
				exclude: exclude
			}
		})
		this.pushRouter('/checkerPicker')
	}

	/**
	 * 选择终审人
	 */
	onPickAudit() {
		const quantify = this.props.quantify
		const audit = quantify.audit
		let exclude = [this.props.me]
		if (quantify.attn) {
			exclude.push(quantify.attn)
		}
		if (quantify.copy) {
			exclude.push(quantify.copy)
		}
		const personList = quantify.getPersonList()
		exclude = exclude.concat(personList)
		exclude = this.getUniquePersonList(exclude)
		const overflow = quantify.getOverflow()
		this.props[checkerPickerActionType.INIT]({
			checker: audit,
			onSubmit: action.setAudit,
			filter: {
				exclude: exclude,
				overflow: overflow
			}
		})
		this.pushRouter('/checkerPicker')
	}

	/**
	 * 人员列表去重
	 */
	getUniquePersonList(personList) {
		let helper = {}
		personList.forEach(person => {
			helper[person.data.id] = person
		})
		let result = []
		for (let key in helper) {
			result.push(helper[key])
		}
		return result
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
	actionType.SET_QUANTIFY_PROPS,
	actionType.SET_QUANTIFY_DATA,
	checkerPickerActionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Checker)