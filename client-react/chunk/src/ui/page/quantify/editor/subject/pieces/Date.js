/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	DatePicker,
	List,
	Toast
} from 'antd-mobile'
import moment from 'moment'
import actionType from '../../actionType'

class Rc_Date extends BaseRc {

	render() {
		const quantify = this.props.quantify
		return (
			<div className='c-date'>
				<List>
					<DatePicker mode="date"
			            title="选择奖扣时间"
			            value={ quantify.date ? quantify.date.toDate() : null }
			            onChange={ this.onChange.bind(this) }>
			          	<List.Item arrow="horizontal">
			          		奖扣时间
			          	</List.Item>
			        </DatePicker>
				</List>
			</div>
		)
	}

	/**
	 * 时间变化
	 */
	onChange(date) {
		if (new Date() < date) {
			Toast.info('不能选择未来的时间', 2);
			return
		}
		const quantify = this.props.quantify
		let momentIns = moment(date)
		this.props[actionType.SET_QUANTIFY_PROPS]({
			date: momentIns
		})
		let quantifyName = quantify.data.quantifyName
		if (/^[0-9]{8}-/.test(quantifyName)) {
			quantifyName = quantifyName.replace(/^[0-9]{8}/, momentIns.format('YYYYMMDD'))
			this.props[actionType.SET_QUANTIFY_DATA]({
				quantifyName: quantifyName
			})
		}
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
)(Rc_Date)