/*
 * @Author: lianpen
 * @Date:   2018-07-03 11:04:30
 * @Desc:   初审弹出框
 */

import {
	Button,
	Modal,
	List,
	TextareaItem
} from 'antd-mobile'
import actionType from '../actionType'
import action from './action'

class CheckModal extends BaseRc {

	render() {
		const footer = [{
			text: '确定',
			onPress: this.onSubmitModal.bind(this)
		}]
		return (
			<Modal
		        visible={ this.props.open }
		        onClose={ this.onCloseModal.bind(this) }
		        title="请填写初审意见"
		        transparent
		        footer={ footer }>
	         	<div className='c-modal'>
	         		{ this.renderInput() }
	         	</div>
	        </Modal>
		)
	}

	/**
	 * 打开时自动聚焦
	 */
	componentWillReceiveProps(nextProps) {
		if (!this.props.open && nextProps.open) {
			let context = this
			setTimeout(() => {
				if (context.autoFocusInst) {
					context.autoFocusInst.focus()
				}
			}, 200)
		}
	}

	/**
	 * 渲染输入框
	 */
	renderInput() {
		return (
			<List>
				<TextareaItem
					ref={ ref => this.autoFocusInst = ref }
	            	rows={ 3 }
	            	value={ this.props.suggestion }
	            	onChange={ this.onChangeSuggestion.bind(this) } />
            </List>
		)
	}

	/**
	 * 改变填写建议
	 */
	onChangeSuggestion(value) {
		this.props[actionType.SET_FIRSTCHECK_SUGGESTION](value)
	}

	/**
	 * 关闭模态框
	 */
	onCloseModal() {
		this.props[actionType.CLOSE_FIRSTCHECK]()
	}

	/**
	 * 提交
	 */
	onSubmitModal() {
		this.props[actionType.CLOSE_FIRSTCHECK]()
		action.submitAfterFirstCheck()
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const firstCheck = state.m_quantify.m_editor.firstCheck
	return {
		open: firstCheck.open,
		suggestion: firstCheck.suggestion
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.SET_FIRSTCHECK_SUGGESTION,
	actionType.CLOSE_FIRSTCHECK
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckModal)