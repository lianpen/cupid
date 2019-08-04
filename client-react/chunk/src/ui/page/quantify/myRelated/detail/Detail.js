/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon,
	ActivityIndicator,
	Toast,
	Modal
} from 'antd-mobile'
import Rc_QuantifyDetail from 'ui/component/quantifyDetail/QuantifyDetail'
import Rc_CheckModal from './CheckModal'
import actionType from './actionType'
import action from './action'
import constants from 'global/constants'
import urlUtil from 'util/url'

class Detail extends BaseRc {

	render() {
		return (
			<div className='p-quantify_myCreated_detail'>
				{ this.renderNavBar() }
				<div className='shared-underNavbar' />
				{ this.renderBody() }
				<Rc_CheckModal />
			</div>
		)
	}

	componentWillMount() {
		this.init()
	}

	/**
	 * 初始化加载
	 */
	async init() {
		document.getElementById('fileLoading').style.display = 'flex'
		this.props[actionType.FETCH_QUANTIFY_0]()
		const data = await action.fetchQuantify()
		this.props[actionType.FETCH_QUANTIFY_1](data)
		document.getElementById('fileLoading').style.display = 'none'
	}

	/**
	 * 渲染导航栏
	 */
	renderNavBar() {
		const region = urlUtil.getValue('region')
		if (region == 'messagePush') {
			return this.renderNavBar_MessagePush()
		}
		return (
			<NavBar mode="light" 
			    icon={<Icon type="left" />}
			    onLeftClick={ this.backRouter }>
				奖扣详情
			</NavBar>
		)
	}

	/**
	 * 渲染消息推送过来的导航栏
	 */
	renderNavBar_MessagePush() {
		const leftContent = (
			<span onClick={ this.pushRouter.bind(this, '/stage') }>
				<Icon type="left" style={{ verticalAlign: -6 }} />
				工作台
			</span>
		)
		return (
			<NavBar mode="light" 
			    leftContent={ leftContent }>
				奖扣详情
			</NavBar>
		)
	}

	/**
	 * 渲染主题
	 */
	renderBody() {
		if (!this.props.quantify) {
			return null
		} else {
			return (
				<Rc_QuantifyDetail quantify={ this.props.quantify }
					actionList={ [] } />
			)
		}
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const m_detail = state.m_quantify.m_myRelated.m_detail
	return {
		quantify: m_detail.quantify,
		pending: m_detail.pending
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.FETCH_QUANTIFY_0,
	actionType.FETCH_QUANTIFY_1,
	actionType.SET_PENDING,
	actionType.OPEN_FIRST_CHECK
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail)