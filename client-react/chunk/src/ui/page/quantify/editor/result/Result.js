/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	Button,
	Flex
} from 'antd-mobile'
import png_rocket from 'assets/png/rocket.png'
import constants from 'global/constants'
import actionType from '../actionType'
import model from 'model'
import './result.less'

class Result extends BaseRc {

	render() {
		return (
			<div className='p-quantify-editor-result'>
				{ this.renderNavBar() }
				{ this.renderBody() }
				{ this.renderButton() }
			</div>
		)
	}

	/**
	 * 渲染导航栏
	 */
	renderNavBar() {
		const text = (
			this.props.mode == constants.EDIT_MODE.ADD ?
			'添加奖扣' :
			'编辑奖扣'
		)
		return (
			<NavBar mode="light">
				{ text }
			</NavBar>
		)
	}

	/**
	 * 渲染内容
	 */
	renderBody() {
		return (
			<div className='c-body'>
				<img className='c-body-png' src={ png_rocket } />
				<p>
					恭喜你，奖扣提交成功!
				</p>
			</div>
		)
	}

	/**
	 * 渲染按钮
	 */
	renderButton() {
		if (this.props.mode == constants.EDIT_MODE.ADD || true) {
			return (
				<Flex className='c-button'>
					<Flex.Item>
						<Button onClick={ this.onClickAddMore.bind(this) }>
							继续提交
						</Button>
					</Flex.Item>
					<Flex.Item>
						<Button type='primary'
							onClick={ this.onSubmit.bind(this) }>
							确定
						</Button>
					</Flex.Item>
				</Flex>
			)
		} else {
			return (
				<Flex className='c-button'>
					<Flex.Item>
						<Button type='primary'
							onClick={ this.onSubmit.bind(this) }>
							确定
						</Button>
					</Flex.Item>
				</Flex>
			)
		}
	}

	/**
	 * 点击继续提交
	 */
	onClickAddMore() {
		const quantify = new model.Quantify()
		quantify.addNewReward()
		this.props[actionType.INIT]({
			mode: constants.EDIT_MODE.ADD,
			quantify: quantify
		})
		this.backManyRouters(2)
	}

	/**
	 * 点击确定
	 */
	onSubmit() {
		this.backManyRouters(3)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		quantify: state.m_quantify.m_editor.quantify,
		mode: state.m_quantify.m_editor.mode
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Result)