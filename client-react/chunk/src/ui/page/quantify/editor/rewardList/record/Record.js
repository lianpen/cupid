/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	Flex,
	WhiteSpace
} from 'antd-mobile'
import Rc_BInput from './BInput'
import Rc_AInput from './AInput'
import Rc_OpInput from './OpInput'
import Rc_CountInput from './CountInput'
import Rc_Remove from './Remove'

class Record extends BaseRc {

	render() {
		const {
			record,
			recordIndex,
			reward,
			rewardIndex,
			uiList
		} = this.props
		if (!record) return
		const useCount = this.isUseCount(reward)
		const ui = uiList[rewardIndex]
		const useAAndOp = ui.useAAndOp
		if (useCount && useAAndOp) {
			return this.render1()
		} else if (useCount && !useAAndOp) {
			return this.render2()
		} else if (!useCount && useAAndOp) {
			return this.render3()
		} else {
			return this.render4()
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.getPropsHash(this.props) !== this.getPropsHash(nextProps)
	}

	/**
	 * 计算属性哈希 用户比较是否需要更新
	 */
	getPropsHash(props) {
		const {
			record,
			recordIndex,
			reward,
			rewardIndex,
			uiList
		} = props
		if (!record) return ''
		const useCount = this.isUseCount(reward)
		const ui = uiList[rewardIndex]
		const useAAndOp = ui.useAAndOp
		const result = [
			useCount,
			useAAndOp,
			record.data.ascoreType,
			record.data.ascore,
			record.data.bscoreType,
			record.data.bscore,
			record.data.opType,
			record.data.opScore,
			record.data.count,
			record.person.data.id
		]
		return result.join(',')
	}

	/**
	 * 是否启动计件
	 */
	isUseCount(reward) {
		const activity = reward.activity
		if (!activity) return false
		return activity.data.isCount == 1
	}

	/**
	 * 第一种情况 
	 * 有计件 有A分产值
	 * 两排
	 * 第一排 姓名 计件
	 * 第二排 B分 A分 产值
	 */
	render1() {
		const {
			record,
			recordIndex,
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item style={{ flex: 2 }}>
						{ record.person.data.name }
					</Flex.Item>
					<Flex.Item style={{ marginLeft: 16 }}>
						<Rc_CountInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
				<WhiteSpace />
				<Flex>
					<Flex.Item>
						<Rc_BInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_AInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_OpInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
				<Rc_Remove
					record={ record } 
					recordIndex={ recordIndex }
					reward={ reward }
					rewardIndex={ rewardIndex } />
			</div>
		)
	}

	/**
	 * 第二种情况
	 * 有计件 无A分产值
	 * 两排
	 * 第一排 姓名
	 * 第二排 B分 计件
	 */
	render2() {
		const {
			record,
			recordIndex,
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item>
						{ record.person.data.name }
					</Flex.Item>
				</Flex>
				<WhiteSpace />
				<Flex>
					<Flex.Item>
						<Rc_CountInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_BInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item />
				</Flex>
				<Rc_Remove top={ 47 }
					record={ record } 
					recordIndex={ recordIndex }
					reward={ reward }
					rewardIndex={ rewardIndex } />
			</div>
		)
	}

	/**
	 * 第三种情况
	 * 无计件 有A分产值
	 * 两排
	 * 第一排 姓名
	 * 第二排 B分 A分 产值
	 */
	render3() {
		const {
			record,
			recordIndex,
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item>
						{ record.person.data.name }
					</Flex.Item>
				</Flex>
				<WhiteSpace />
				<Flex>
					<Flex.Item>
						<Rc_BInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_AInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_OpInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
				<Rc_Remove top={ 47 }
					record={ record } 
					recordIndex={ recordIndex }
					reward={ reward }
					rewardIndex={ rewardIndex } />
			</div>
		)
	}

	/**
	 * 第四种情况
	 * 无计件 无A分产值
	 * 一排
	 * 姓名 B分
	 */
	render4() {
		const {
			record,
			recordIndex,
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item style={{ flex: 2 }}>
						{ record.person.data.name }
					</Flex.Item>
					<Flex.Item>
						<Rc_BInput 
							record={ record } 
							recordIndex={ recordIndex }
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
				<Rc_Remove
					record={ record } 
					recordIndex={ recordIndex }
					reward={ reward }
					rewardIndex={ rewardIndex } />
			</div>
		)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		quantify: state.m_quantify.m_editor.quantify,
		uiList: state.m_quantify.m_editor.uiList
	}
}

export default connect(
	mapStateToProps
)(Record)