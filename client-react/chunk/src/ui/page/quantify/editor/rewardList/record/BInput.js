/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon
} from 'antd-mobile'
import actionType from '../../actionType'

class BInput extends BaseRc {

	render() {
		const record = this.props.record
		if (!record) return
		return (
			<div className='c-record-item'>
				{ this.renderType() }
				{ this.renderInput() }
			</div>
		)
	}

	shouldComponentUpdate(nextProps) {
		return this.getPropsHash(this.props) !== this.getPropsHash(nextProps)
	}

	/**
	 * 计算属性哈希 用户比较是否需要更新
	 */
	getPropsHash(props) {
		const {
			record
		} = props
		if (!record) return ''
		const result = [
			record.data.bscoreType,
			record.data.bscore,
			record.person.data.id
		]
		return result.join(',')
	}

	/**
	 * 渲染类型
	 */
	renderType() {
		const record = this.props.record
		const type = record.data.bscoreType
		let text
		let background
		if (record.data.bscoreType == 1) {
			text = 'B+'
			background = '#93cd30'
		} else {
			text = 'B-'
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
			record,
			recordIndex,
			rewardIndex
		} = this.props
		const type = record.data.bscoreType
		const newType = type == 1 ? 0 : 1
		this.props[actionType.SET_QUANTIFY_REWARD_RECORD_DATA]({
			rewardIndex,
			recordIndex,
			data: {
				bscoreType: newType
			}
		})
	}

	/**
	 * 渲染输入框
	 */
	renderInput() {
		const record = this.props.record
		return (
			<div className='c-record-item-input'>
				<input type='number' 
					value={ record.data.bscore || '' } 
					onChange={ this.onChangeInput.bind(this) }
					placeholder='0'
					min={ 0 } /> 
			</div>
		)
	}


	/**
	 * 输入框变化
	 */
	onChangeInput(event) {
		let value = event.target.value
		value = value.replace(/[^0-9]/, '')
		value = value.slice(0, 8)
		if (value) {
			value = parseInt(value)
		}
		const {
			recordIndex,
			rewardIndex
		} = this.props
		this.props[actionType.SET_QUANTIFY_REWARD_RECORD_DATA]({
			rewardIndex,
			recordIndex,
			data: {
				bscore: value
			}
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
	actionType.SET_QUANTIFY_REWARD_RECORD_DATA
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BInput)