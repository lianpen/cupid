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
import quantifyEditorActionType from 'ui/page/quantify/editor/actionType'
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
			<span onClick={ this.pushRouter.bind(this, '/quantify/myCreated') }>
				<Icon type="left" style={{ verticalAlign: -6 }} />
				积分奖扣
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
					actionList={ this.getActionList() } />
			)
		}
	}

	/**
	 * 计算操作列表
	 * 拟稿状态有编辑，提交，删除
	 * 待初审状态有撤回
	 */
	getActionList() {
		const quantify = this.props.quantify
		if (!quantify) return []
		if (quantify.data.status == constants.CHECK_STATUS.AT_PREPARE) {
			return [{
				text: '编辑',
				onClick: this.onEditQuantify.bind(this)
			}, {
				text: '提交',
				onClick: this.onSubmitQuantify.bind(this)
			}, {
				text: '删除',
				onClick: this.onDeleteQuantify.bind(this)
			}]
		} else if (quantify.data.status == constants.CHECK_STATUS.TO_FIRST_CHECK) {
			return [{
				text: '撤回',
				onClick: this.onDrawQuantify.bind(this)
			}]
		} else if (quantify.data.status == constants.CHECK_STATUS.TO_FINAL_CHECK) {
			const me = this.props.me.data.id
			const attnId = quantify.data.attnEmployeeId
			if (me == attnId) {
				return [{
					text: '撤回',
					onClick: this.onDrawQuantify.bind(this)
				}]
			}
			return []
		}
	}

	/**
	 * 编辑单条奖扣
	 */
	onEditQuantify() {
		const quantify = this.props.quantify
		this.props[quantifyEditorActionType.INIT]({
			mode: constants.EDIT_MODE.EDIT,
			quantify: quantify
		})
		this.pushRouter('/quantify/editor?id=' + quantify.data.id)
	}

	/**
	 * 提交奖扣
	 */
	async onSubmitQuantify() {
		if (this.props.pending) return
		const quantify = this.props.quantify
		const validateResult = quantify.validateSubmit()
		if (!validateResult.success) {
			Toast.fail(validateResult.message, 3, fn.noop, false)
			return
		}
		const data = quantify.buildRequestSubjectData()
		await this.request({
			module: 'integralQuantify',
			action: 'submitQuantifyById',
			data: data
		})
		if (quantify.isIAmAttn()) {
			this.props[actionType.OPEN_FIRST_CHECK]()
		} else {
			this.props[actionType.SET_PENDING](true)
			const data = quantify.buildRequestSubjectData()
			Toast.loading()
			await this.request({
				module: 'integralQuantify',
				action: 'submitQuantifyById',
				data: data
			})
			Toast.success('提交成功！')
			this.props[actionType.SET_PENDING](false)
			this.backRouter()
		}
	}

	/**
	 * 删除奖扣
	 */
	onDeleteQuantify() {
		Modal.alert('你确定要删除这条奖扣吗？', '', [{
			text: '取消',
			onPress: fn.noop
		}, {
			text: 'Ok',
			onPress: this.onDeleteQuantifyOk.bind(this)
		}])
	}

	async onDeleteQuantifyOk() {
		if (this.props.pending) return
		const quantify = this.props.quantify
		this.props[actionType.SET_PENDING](true)
		Toast.loading()
		await this.request({
			module: 'integralQuantify',
			action: 'deleteQuantify',
			data: {
				'entity.id': quantify.data.id,
				'entity.status': 0
			}
		})
		Toast.success('删除成功！')
		this.props[actionType.SET_PENDING](false)
		this.backRouter()
	}

	/**
	 * 撤回奖扣
	 */
	async onDrawQuantify() {
		if (this.props.pending) return
		const quantify = this.props.quantify
		this.props[actionType.SET_PENDING](true)
		Toast.loading()
		await this.request({
			module: 'integralQuantify',
			action: 'drawQuantify',
			data: {
				'entity.id': quantify.data.id
			}
		})
		Toast.success('撤回成功！')
		this.props[actionType.SET_PENDING](false)
		this.backRouter()
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const m_detail = state.m_quantify.m_myCreated.m_detail
	return {
		quantify: m_detail.quantify,
		pending: m_detail.pending,
		me: state.m_global.me
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.FETCH_QUANTIFY_0,
	actionType.FETCH_QUANTIFY_1,
	actionType.SET_PENDING,
	actionType.OPEN_FIRST_CHECK,
	quantifyEditorActionType.INIT
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail)