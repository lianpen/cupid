/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	List
} from 'antd-mobile'

class Statistic extends BaseRc {

	render() {
		return (
			<List renderHeader={ this.renderHeader.bind(this) }
				className='c-statistic'>
	          	<List.Item>
	          		<div className='c-statistic-bd'>
		          		{ this.renderNumber() }
		          		{ this.renderBscore() }
		          		{ this.renderAscore() }
		          		{ this.renderOpscore() }
	          		</div>
	          	</List.Item>
			</List>
		)
	}

	/**
	 * 渲染头部
	 */
	renderHeader() {
		return '统计'
	}

	/**
	 * 渲染数量
	 */
	renderNumber() {
		const quantify = this.props.quantify
		const rewardNumber = quantify.rewardList.length
		const personNumber = quantify.rewardList.reduce((result, reward) => {
			return result + reward.recordList.length
		}, 0)
		return (
			<p>
				<label>
					事件/人次
				</label>
				<i>
					:
				</i>
				<span>
					{ rewardNumber } / { personNumber }
				</span>
			</p>
		)
	}

	/**
	 * 渲染B分
	 */
	renderBscore() {
		const quantify = this.props.quantify
		let goodScore = 0
		let badScore = 0
		quantify.rewardList.forEach(reward => {
			reward.recordList.forEach(record => {
				const score = record.data.bscore
				const type = record.data.bscoreType
				const count = record.data.count
				if (score) {
					if (type == 0) {
						badScore += score * count
					} else if (type == 1) {
						goodScore += score * count
					}
				}
			})
		})
		return (
			<p>
				<label>
					B分
				</label>
				<i>
					:
				</i>
				{ this.renderABSpan(goodScore, badScore) }
			</p>
		)
	}

	/**
	 * 渲染AB分值
	 */
	renderABSpan(goodScore, badScore) {
		if (goodScore && badScore) {
			return (
				<span>
					{ goodScore } / <em>-{ badScore }</em>
				</span>
			)
		} else if (goodScore && !badScore) {
			return (
				<span>
					{ goodScore }
				</span>
			)
		} else if (!goodScore && badScore) {
			return (
				<span>
					<em>
						-
						{ badScore }
					</em>
				</span>
			)
		} else {
			return (
				<span>
					0
				</span>
			)
		}
	}

	/**
	 * 渲染A分
	 */
	renderAscore() {
		const quantify = this.props.quantify
		let goodScore = 0
		let badScore = 0
		quantify.rewardList.forEach(reward => {
			reward.recordList.forEach(record => {
				const score = record.data.ascore
				const type = record.data.ascoreType
				const count = record.data.count
				if (score) {
					if (type == 0) {
						badScore += score * count
					} else if (type == 1) {
						goodScore += score * count
					}
				}
			})
		})
		return (
			<p>
				<label>
					A分
				</label>
				<i>
					:
				</i>
				{ this.renderABSpan(goodScore, badScore) }
			</p>
		)
	}

	/**
	 * 渲染产值
	 */
	renderOpscore() {
		const quantify = this.props.quantify
		let virtual = 0
		let real = 0
		let create = 0
		quantify.rewardList.forEach(reward => {
			reward.recordList.forEach(record => {
				const score = record.data.opScore
				const type = record.data.opType
				const count = record.data.count
				if (score) {
					if (type == constants.OUTPUT_TYPE.VIRTUAL) {
						virtual += score * count
					} else if (type == constants.OUTPUT_TYPE.REAL) {
						real += score * count
					} else if (type == constants.OUTPUT_TYPE.CREATE) {
						create += score * count
					}
				}
			})
		})
		return (
			<p>
				<label>
					虚/实/创
				</label>
				<i>
					:
				</i>
				<span>
					{ virtual } / { real } / { create }
				</span>
			</p>
		)
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

const mapDispatchToProps = fn.getMapDispatchToProps([])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Statistic)