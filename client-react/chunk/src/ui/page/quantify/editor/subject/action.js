/*
 * @Author: lianpen
 * @Date:   2018-06-21 16:51:04
 */

import store from 'store'
import respool from 'global/respool'
import actionType from '../actionType'
import API from 'util/API'
import constants from 'global/constants'
import {
	Toast,
	Modal
} from 'antd-mobile'

const module = {
	/**
	 * 选中初审人
	 */
	setAttn: () => {
		store.dispatch({
			type: actionType.SET_QUANTIFY_PROPS,
			data: {
				attn: store.getState().m_checkerPicker.checker
			}
		})
	},
	/**
	 * 选中终审人
	 */
	setAudit: () => {
		store.dispatch({
			type: actionType.SET_QUANTIFY_PROPS,
			data: {
				audit: store.getState().m_checkerPicker.checker
			}
		})
	},
	/**
	 * 选中抄送人
	 */
	setCopy: () => {
		store.dispatch({
			type: actionType.SET_QUANTIFY_PROPS,
			data: {
				copy: store.getState().m_checkerPicker.checker
			}
		})
	},
	/**
	 * 数据提交
	 */
	submit: () => {
		handler = new Handler()
		handler.submit()
	},
	/**
	 * 填写初审后提交
	 */
	submitAfterFirstCheck: () => {
		const state = store.getState()
		const m_editor = state.m_quantify.m_editor
		const suggestion = m_editor.firstCheck.suggestion
		handler.suggestion = suggestion
		handler.submitAfterFirstCheck()
	}
}

/**
 * 处理器实例
 */
let handler = null

/**
 * 数据提交处理
 */
class Handler {

	constructor() {
		const state = store.getState()
		const m_editor = state.m_quantify.m_editor
		const m_global = state.m_global
		this.quantify = m_editor.quantify
		this.mode = m_editor.mode
		this.me = m_global.me
		this.departmentTree = respool.departmentTree
		this.pending = m_editor.pending
	}

	/**
	 * 处理器提交
	 * 1. 如果加载中 return
	 * 2. 如果校验失败 弹框 return
	 * 3. 如果有事件分割 确认框确认
	 * 4. 如果需要初审 弹初审框 结束
	 * 5. 发起请求
	 */
	async submit() {
		if (this.pending) {
			return
		}
		let validateResult = this.validate()
		if (validateResult) {
			Toast.fail(validateResult, 3, fn.noop, false)
			return
		}
		if (this.isToSplit()) {
			const confirmResult = await this.onConfirmSplit()
			if (!confirmResult) {
				return
			}
		}
		if (this.needFirstCheck()) {
			store.dispatch({
				type: actionType.OPEN_FIRSTCHECK
			})
			return
		} else {
			this.request()
		}
	}

	/**
	 * 初审填写后提交
	 */
	submitAfterFirstCheck() {
		const state = store.getState()
		const m_editor = state.m_quantify.m_editor
		const suggestion = m_editor.firstCheck.suggestion
		this.request(suggestion)
	}

	/**
	 * 提交奖扣
	 */
	async request(suggestion) {
		store.dispatch({
			type: actionType.SET_PENDING,
			data: true
		})
		const data = this.quantify.buildRequestSubjectData()
		if (this.needFirstCheck()) {
			data['entity.attnOpinion'] = suggestion || ''
		}
		try {
			Toast.loading('', 0)
			await API.request({
				module: 'integralQuantify',
				action: 'submitQuantify',
				data: data
			})
			Toast.hide()
		} catch (e) {
			alert('提交奖扣失败')
			Toast.hide()
		}
		store.dispatch({
			type: actionType.SET_PENDING,
			data: false
		})
		location.hash = '/quantify/editor/result'
	}

	/**
	 * 是否需要弹出初审框
	 * 普通事件与诸多专审事件只要有一个初审人不是我 就不弹框
	 * 所有事件初审人都是我 才弹框
	 */
	needFirstCheck() {
		const auditTickedRewardList = this.quantify.getAuditTickedRewardList()
		const auditRewardList = this.quantify.getAuditRewardList()
		if (auditTickedRewardList.length) {
			if (this.quantify.attn && this.quantify.attn.data.id != this.me.data.id) {
				return false
			}
		}
		if (auditRewardList.length) {
			if (auditRewardList.some(reward => {
					if (reward.attn && reward.attn.data.id != this.me.data.id) {
						return true
					}
					return false
				})) {
				return false
			}
		}
		return true
	}

	/**
	 * 校验
	 */
	validate() {
		const validateResult = this.quantify.validateSubmit()
		if (!validateResult.success) {
			return validateResult.message
		}
		if (this._isQuantifyCheckable()) {
			if (!this.quantify.attn) {
				return '请选择初审人'
			}
			if (!this.quantify.audit) {
				return '请选择终审人'
			}
			const personList = this.quantify.getAuditTickedPersonList()
			const personIdList = personList.map(person => person.data.id)
			if (personIdList.some(id => {
					return id == this.quantify.audit.data.id
				})) {
				return '终审人不能是参与人'
			}
		}
		if (this.quantify.audit && this.quantify.audit.data.id === this.me.data.id) {
			return '不能选择自己为终审人'
		}
		if (
			this.quantify.audit &&
			this.quantify.attn &&
			this.quantify.audit.data.id === this.quantify.attn.data.id
		) {
			return '初审人不能和终审人相同'
		}
		const title = this.quantify.data.quantifyName
		if (/^20[0-9]{6}-(未设置主题)?$/.test(title)) {
			return '请填写主题'
		}
		return null
	}

	/**
	 * 确认分割
	 */
	onConfirmSplit() {
		return new Promise(resolve => {
			Modal.alert('', '您的主题已被拆分为多个事件，是否确认提交？', [{
				text: '确定',
				onPress: () => {
					resolve(true)
				}
			}, {
				text: '取消',
				onPress: () => {
					resolve(false)
				}
			}])
		})
	}

	/**
	 * 是否将拆分成多个事件
	 */
	isToSplit() {
		if (this.mode == constants.EDIT_MODE.EDIT) return false
		const rewardList = this.quantify.rewardList
		if (rewardList.length < 2) return false
		const hasAudit = rewardList.some(reward => {
			const activity = reward.activity
			if (!activity) return false
			return activity.data.audit == 1
		})
		return hasAudit
	}

	/**
	 * 是否渲染初审人和终审人
	 * 当所有reward都是专审时 不显示
	 * 否则 显示
	 */
	_isQuantifyCheckable() {
		return this.quantify.rewardList.some(reward => {
			if (!reward.activity) return false
			return reward.activity.data.audit != 1
		})
	}
}

export default module