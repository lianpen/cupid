/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon
} from 'antd-mobile'
import actionType from '../../actionType'

class Remove extends BaseRc {

	shouldComponentUpdate(nextProps) {
		return this.getPropsHash(this.props) !== this.getPropsHash(nextProps)
	}

	render() {
		return (
			<div className='c-record-remove' style={{ top: this.props.top }}>
				<Icon type="cross-circle" 
					onClick={ this.onClick.bind(this) }
					size='sm' />
			</div>
		)
	}

	/**
	 * 计算属性哈希 用户比较是否需要更新
	 */
	getPropsHash(props) {
		const {
			top
		} = props
		const result = [
			top
		]
		return result.join(',')
	}

	/**
	 * 点击删除
	 */
	onClick() {
		const {
			recordIndex,
			rewardIndex
		} = this.props
		this.props[actionType.REMOVE_QUANTIFY_REWARD_RECORD]({
			rewardIndex,
			recordIndex
		})
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.REMOVE_QUANTIFY_REWARD_RECORD
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Remove)