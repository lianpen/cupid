/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon
} from 'antd-mobile'
import actionType from '../../actionType'

class AInput extends BaseRc {

	render() {
		const {
			rewardIndex,
			uiList
		} = this.props
		const record = uiList[rewardIndex].quickRecord
		return (
			<div className='c-record-item'>
				{ this.renderType() }
				{ this.renderInput() }
			</div>
		)
	}

	/**
	 * 渲染类型
	 */
	renderType() {
		const {
			rewardIndex,
			uiList
		} = this.props
		const record = uiList[rewardIndex].quickRecord
		const type = record.data.ascoreType
		let text
		let background
		if (record.data.ascoreType == 1) {
			text = 'A+'
			background = '#93cd30'
		} else {
			text = 'A-'
			background = '#ff4141'
		}
		return (
			<div className='c-record-item-type' 
				style={{ background: background }}
				onClick={ this.onClickType.bind(this) }>
				{ text }
			</div>
		)
	}

	/**
	 * 点击类型
	 */
	onClickType() {
		const {
			rewardIndex,
			uiList
		} = this.props
		const record = uiList[rewardIndex].quickRecord
		const type = record.data.ascoreType
		const newType = type == 1 ? 0 : 1
		this.props[actionType.SET_QUICKRECORD_DATA]({
			index: rewardIndex,
			data: {
				ascoreType: newType,
				bscoreType: newType
			}
		})
	}

	/**
	 * 渲染输入框
	 */
	renderInput() {
		const {
			rewardIndex,
			uiList
		} = this.props
		const record = uiList[rewardIndex].quickRecord
		return (
			<div className='c-record-item-input'>
				<input type='number' 
					value={ record.data.ascore || '' } 
					onChange={ this.onChangeInput.bind(this) }
					placeholder='0' /> 
			</div>
		)
	}


	/**
	 * 输入框变化
	 * A分变化会影响B分变化
	 * 如果B分已经大于了A分*abmultiple 不影响B分变化
	 */
	onChangeInput(event) {
		let value = event.target.value
		value = value.replace(/[^0-9]/, '')
		value = value.slice(0, 8)
		if (value) {
			value = parseInt(value)
		}
		const {
			rewardIndex,
			uiList
		} = this.props
		const record = uiList[rewardIndex].quickRecord
		let bscore = value * this.props.abmultiple
		if (record.data.bscore) {
			bscore = Math.max(record.data.bscore, value * this.props.abmultiple)
		}
		this.props[actionType.SET_QUICKRECORD_DATA]({
			index: rewardIndex,
			data: {
				ascore: value,
				bscore: bscore
			}
		})
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		quantify: state.m_quantify.m_editor.quantify,
		uiList: state.m_quantify.m_editor.uiList,
		abmultiple: state.m_global.config.abmultiple
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.SET_QUICKRECORD_DATA
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AInput)