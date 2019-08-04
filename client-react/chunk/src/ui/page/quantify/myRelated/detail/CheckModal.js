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
import actionType from './actionType'
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
		this.props[actionType.SET_FIRST_CHECK_SUGGESTION](value)
	}

	/**
	 * 关闭模态框
	 */
	onCloseModal() {
		this.props[actionType.CLOSE_FIRST_CHECK]()
	}

	/**
	 * 提交
	 */
	async onSubmitModal() {
		if (this.props.pending) return
		const quantify = this.props.quantify
		const data = quantify.buildRequestSubjectData()
		this.props[actionType.SET_PENDING](true)
		Toast.loading()
		await this.request({
			module: 'integralQuantify',
			action: 'submitQuantifyById',
			data: data
		})
		await this.request({
			module: 'integralQuantify',
			action: 'passQuantify',
			data: {
				'entity.id': quantify.data.id,
				'suggestion': this.props.suggestion
			}
		})
		this.props[actionType.SET_PENDING](false)
		this.props[actionType.CLOSE_FIRST_CHECK]()
		Toast.success('提交成功！')
		this.backRouter()
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const m_detail = state.m_quantify.m_myCreated.m_detail
	return {
		open: m_detail.firstCheck.open,
		suggestion: m_detail.firstCheck.suggestion,
		quantify: m_detail.quantify,
		pending: m_detail.pending
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.SET_FIRST_CHECK_SUGGESTION,
	actionType.CLOSE_FIRST_CHECK,
	actionType.SET_PENDING
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckModal)