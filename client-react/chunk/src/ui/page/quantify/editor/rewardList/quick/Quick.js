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

class Quick extends BaseRc {

	render() {
		const {
			reward,
			rewardIndex,
			uiList
		} = this.props
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
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item style={{ flex: 2 }}>
						快捷设置 
					</Flex.Item>
					<Flex.Item style={{ marginLeft: 16 }}>
						<Rc_CountInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
				<WhiteSpace />
				<Flex>
					<Flex.Item>
						<Rc_BInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_AInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_OpInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
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
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item>
						快捷设置 
					</Flex.Item>
				</Flex>
				<WhiteSpace />
				<Flex>
					<Flex.Item>
						<Rc_CountInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_BInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item />
				</Flex>
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
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item>
						快捷设置 
					</Flex.Item>
				</Flex>
				<WhiteSpace />
				<Flex>
					<Flex.Item>
						<Rc_BInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_AInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
					<Flex.Item>
						<Rc_OpInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
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
			reward,
			rewardIndex
		} = this.props
		return (
			<div className='c-record shared-border-bottom'>
				<Flex justify='between'>
					<Flex.Item style={{ flex: 2 }}>
						快捷设置 
					</Flex.Item>
					<Flex.Item>
						<Rc_BInput 
							reward={ reward }
							rewardIndex={ rewardIndex } />
					</Flex.Item>
				</Flex>
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
)(Quick)