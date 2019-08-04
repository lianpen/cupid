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
		const quantify = this.props.quantify
		return (
			<div className='c-copy'>    
				<List>
					{ this.renderCopy() }
	      		</List>
			</div>
		)
	}

	/**
	 * 渲染抄送人
	 */
	renderCopy() {
		const quantify = this.props.quantify
		const copy = quantify.copy
		const extra = (
			copy ? copy.data.name : '请选择'
		)
		return (
			<List.Item extra={ extra }
    			arrow='horizontal'
    			onClick={ this.onPickCopy.bind(this) }>
    			抄送人（非必填）
    		</List.Item>
		)
	}

	/**
	 * 选择抄送人
	 * 抄送人不能是初审人
	 * 抄送人不能是终审人
	 */
	onPickCopy() {
		const quantify = this.props.quantify
		const copy = quantify.copy
		let exclude = []
		if (quantify.attn) {
			exclude.push(quantify.attn)
		}
		if (quantify.audit) {
			exclude.push(quantify.audit)
		}
		this.props[checkerPickerActionType.INIT]({
			checker: copy,
			onSubmit: action.setCopy,
			filter: {
				exclude: exclude
			}
		})
		this.pushRouter('/checkerPicker')
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
	actionType.SET_QUANTIFY_PROPS,
	actionType.SET_QUANTIFY_DATA,
	checkerPickerActionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Checker)