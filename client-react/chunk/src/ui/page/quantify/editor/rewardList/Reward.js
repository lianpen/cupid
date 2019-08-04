/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	List,
	TextareaItem
} from 'antd-mobile'
import Rc_Activity from './Activity'
import Rc_Checker from './Checker'
import Rc_RecordHelper from './RecordHelper'
import Rc_RecordList from './RecordList'
import actionType from '../actionType'

class Reward extends BaseRc {

	render() {
		const {
			reward,
			index
		} = this.props
		return (
			<div className='c-reward'>
				<Rc_Activity reward={ reward } index={ index } />
				{ this.renderDesc() }
				<Rc_Checker reward={ reward } index={ index } />
				<Rc_RecordHelper reward={ reward } index={ index } />
				<Rc_RecordList reward={ reward } index={ index } />
			</div>
		)
	}

	/**
	 * 渲染描述
	 */
	renderDesc() {
		const {
			reward,
			index
		} = this.props
		return (
			<List>
	          	<TextareaItem
		            autoHeight
		            placeholder='描述'
		            rows={ 2 }
		            value={ reward.desc }
		            onChange={ this.onChangeDesc.bind(this) } />
	        </List>
		)
	}

	/**
	 * 改变描述
	 */
	onChangeDesc(value) {
		this.props[actionType.SET_QUANTIFY_REWARD_PROPS]({
			rewardIndex: this.props.index,
			props: {
				desc: value
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
	actionType.SET_QUANTIFY_REWARD_PROPS
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Reward)