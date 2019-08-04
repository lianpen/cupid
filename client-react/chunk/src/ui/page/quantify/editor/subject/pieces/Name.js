/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	InputItem,
	TextareaItem,
	List
} from 'antd-mobile'
import actionType from '../../actionType'

class Name extends BaseRc {

	render() {
		const quantify = this.props.quantify
		return (
			<div className='c-name'>
				<List>
					<InputItem placeholder='填写主题名称'
						value={ quantify.data.quantifyName }
						onChange={ this.onChangeQuantifyName.bind(this) } />
					<TextareaItem placeholder='填写备注'
						rows={ 3 }
						value={ quantify.data.remark }
						onChange={ this.onChangeRemark.bind(this) } />
				</List>
			</div>
		)
	}

	/**
	 * 改变主题名称
	 */
	onChangeQuantifyName(value) {
		value = value.slice(0, 100)
		this.props[actionType.SET_QUANTIFY_DATA]({
			quantifyName: value
		})
	}

	/**
	 * 改变备注
	 */
	onChangeRemark(value) {
		value = value.slice(0, 200)
		this.props[actionType.SET_QUANTIFY_DATA]({
			remark: value
		})
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
	actionType.SET_QUANTIFY_DATA
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Name)