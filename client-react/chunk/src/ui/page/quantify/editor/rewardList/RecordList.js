/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar
} from 'antd-mobile'
import Rc_Record from './record/Record'

class RecordList extends BaseRc {

	render() {
		return (
			<div className='c-recordList'>
				{ this.renderList() }
			</div>
		)
	}

	/**
	 * 渲染列表
	 */
	renderList() {
		const rcList = this.props.reward.recordList.map((record, index) => (
			<Rc_Record key={ index } 
				record={ record } 
				recordIndex={ index }
				reward={ this.props.reward }
				rewardIndex={ this.props.index } />
		))
		return (
			<div className='c-record-list'>
				{ rcList }
			</div>
		)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = fn.getMapDispatchToProps([])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecordList)