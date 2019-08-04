/*
 * @Author: lianpen
 * @Date:   2018-06-21 16:51:04
 */

import store from 'store'
import respool from 'global/respool'
import actionType from '../actionType'
import API from 'util/API'
import model from 'model'
import {
	Toast
} from 'antd-mobile'

const module = {
	/**
	 * 选中事件回调
	 * 除了设置事件 还要预设初审人
	 * 终审人在model.reward中有统一的处理 因为要校验权限
	 */
	setRewardActivity: rewardIndex => {
		const activity = store.getState().m_activityPicker.activity
		let attn = null
		if (activity && activity.data.audit == 1) {
			const bindedAttnList = activity.getBindedAttnList()
			if (bindedAttnList.length) {
				attn = bindedAttnList[0]
			}
		}
		store.dispatch({
			type: actionType.SET_QUANTIFY_REWARD_PROPS,
			data: {
				rewardIndex: rewardIndex,
				props: {
					activity: activity,
					attn: attn
				}
			}
		})
	},
	/**
	 * 选中人员列表回调
	 */
	setRewardPersonList: rewardIndex => {
		const personList = store.getState().m_personPicker.personList
		const uiList = store.getState().m_quantify.m_editor.uiList
		store.dispatch({
			type: actionType.SET_QUANTIFY_REWARD_PROPS,
			data: {
				rewardIndex: rewardIndex,
				props: {
					personList: personList,
					quickRecord: uiList[rewardIndex].quickRecord
				}
			}
		})
	},
	/**
	 * 选中初审人回调
	 */
	setRewardAttn: rewardIndex => {
		const checker = store.getState().m_checkerPicker.checker
		store.dispatch({
			type: actionType.SET_QUANTIFY_REWARD_PROPS,
			data: {
				rewardIndex: rewardIndex,
				props: {
					attn: checker
				}
			}
		})
	},
	/**
	 * 选中终审人回调
	 */
	setRewardAudit: rewardIndex => {
		const checker = store.getState().m_checkerPicker.checker
		store.dispatch({
			type: actionType.SET_QUANTIFY_REWARD_PROPS,
			data: {
				rewardIndex: rewardIndex,
				props: {
					audit: checker
				}
			}
		})
	},
	/**
	 * 数据提交
	 */
	submit: () => {
		return new Promise(async resolve => {
			const handler = new SubmitHandler()
			await handler.involve()
			resolve()
		})
	}
}

/**
 * 数据提交处理
 */
class SubmitHandler {

	constructor() {
		const m_editor = store.getState().m_quantify.m_editor
		const m_global = store.getState().m_global
		this.quantify = m_editor.quantify
		this.mode = m_editor.mode
		this.me = m_global.me
		this.departmentTree = respool.departmentTree
	}

	/**
	 * 模块介入
	 */
	involve() {
		return new Promise(async resolve => {
			Toast.loading('', 0)
			const error = this.quantify.validateRewards()
			if (error) {
				Toast.fail(error, 3, fn.noop, false)
				resolve()
				return
			}
			try {
				await this.requestSaveTempActivityList()
				await this.requestAddQuantify()
				Toast.hide()
				resolve()
			} catch (e) {
				Toast.hide()
				alert('提交奖扣失败')
				resolve()
			}
		})
	}

	/**
	 * 保存临时事件
	 */
	requestSaveTempActivityList() {
		const tempRewardList = this.quantify.rewardList.filter(reward => {
			return !reward.activity.data.id
		})
		const promiseList = tempRewardList.map(reward => {
			const activity = reward.activity
			return new Promise(async resolve => {
				const resp = await API.request({
					module: 'event',
					action: 'saveTemp',
					data: {
						'entity.eventName': activity.data.eventName,
						'entity.typeId': activity.data.typeId,
						'entity.normId': activity.data.normId
					}
				})
				reward.activity = new model.Activity(resp.obj)
				resolve()
			})
		})
		return new Promise(async resolve => {
			await Promise.all(promiseList)
			resolve()
		})
	}

	/**
	 * 提交添加奖扣请求
	 */
	async requestAddQuantify() {
		let data = this.quantify.buildRequestRewardsData(this.mode)
		let resp
		if (this.quantify.taskHall) {
			let data = {
				id: this.quantify.data.attnEmployeeId,
				name: this.quantify.data.attnFullName,
				num: this.quantify.data.attnEmpNum
			}
			this.quantify.taskHallAttn = new model.Person(data)
		}
		try {
			resp = await API.request({
				module: 'integralQuantify',
				action: 'addQuantify',
				data: data
			})
		} catch (e) {
			alert('请求异常' + JSON.stringify(e))
		}
		this.quantify.parseDirtyQuantifyData(resp.obj)
		this.quantify.checkAuditPermission() //校验终审人权限
		this.onGoToNextStep()
	}

	/**
	 * 奖扣保存成功 进入下一步
	 * 1. 预设初审人 终审人
	 * 2. 如果只有一个事件 定义主题为事件名
	 * 2. 视图跳转
	 */
	onGoToNextStep() {
		if (!this.quantify.attn || this.mode === constants.EDIT_MODE.ADD) {
			const attn = this.getPresetAttn()
			if (attn) this.quantify.attn = attn
		}
		if (!this.quantify.audit) {
			this.quantify.audit = this.getPresetAudit()
			if (this.quantify.audit && this.quantify.audit.data.id == this.me.data.id) {
				this.quantify.audit = null
			}
		}
		if (this.quantify.data.quantifyName.indexOf('未设置主题') && this.quantify.rewardList.length == 1) {
			const activity = this.quantify.rewardList[0].activity
			if (activity) {
				const activityName = activity.getName()
				this.quantify.data.quantifyName = this.quantify.data.quantifyName.replace('未设置主题', activityName)
			}
		}
		window.location.hash = '/quantify/editor/subject'
	}

	/**
	 * 预设初审人
	 * 如果在添加模式下 尚未选择初审人
	 * 1. 剔除专审事件后，如果所有参与人在同一部门，如果该部门有初审人，预设第一个初审人
	 * 2. 如果我有奖扣权限，预设我是初审人
	 */
	getPresetAttn() {
		if (this.quantify.taskHallAttn) {
			return this.quantify.taskHallAttn
		}
		const isAtSomeDepartment = this.quantify.isAtSomeDepartment()
		if (isAtSomeDepartment) {
			const departmentId = this.quantify.rewardList[0].recordList[0].person.data.departmentId
			const department = this.departmentTree.getDepartmentById(departmentId)
			if (department) {
				const attnList = department.attnList
				if (attnList && attnList.length) {
					return attnList[0]
				}
			}
		}
		if (this.me.isCanCheck()) {
			return this.me
		}
		return null
	}

	/**
	 * 预设终审人
	 * 如果在添加模式下 尚未选择终审人
	 * 剔除专审事件后，如果所有参与人在同一部门，如果该部门有终审人，预设终审人
	 * 
	 * 过滤条件1: 如果权限够
	 * 过滤条件2: 不能是我 不能是参与人
	 */
	getPresetAudit() {
		const isAtSomeDepartment = this.quantify.isAtSomeDepartment()
		if (!isAtSomeDepartment) return null
		const departmentId = this.quantify.rewardList[0].recordList[0].person.data.departmentId
		const department = this.departmentTree.getDepartmentById(departmentId)
		if (!department) return null
		const auditList = department.auditList
		if (!auditList || !auditList.length) return null
		const personList = this.quantify.getPersonList()
		const audit = auditList.find(checker => {
			if (!checker.canCheckQuantify(this.quantify)) return false
			if (personList.some(person => person.data.id == checker.data.id)) return false
			return true
		})
		return audit
	}


}

export default module