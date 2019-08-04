/*
 * @Author: lianpen
 * @Date:   2018-06-12 14:16:34
 */
/*
 * @Author: lianpen
 * @Date:   2018-06-08 10:27:54
 */

import API from 'util/API'
import store from 'store'
import constants from 'global/constants'
import model from 'model'
import moment from 'moment'
import dateUtil from 'util/date'

const module = {
	fetchList: pageIndex => {
		return new Promise(resolve => {
			API.request({
				module: 'integralQuantifyRecord',
				action: 'getMyRelatedRecordList',
				data: getRequestListData()
			}).then(resp => {
				const recordList = resp.resultlist
				const totalNumber = resp.pagination ? resp.pagination.totalRows : 0
				resolve({
					recordList,
					totalNumber
				})
			}, resp => {
				resolve({
					recordList: [],
					totalNumber: 0
				})
			});
		})
	}
}

export default module

function getRequestListData() {
	const m_store = store.getState().m_quantify.m_myRelated.m_screen
	const pagerData = {
		'pagination.pageNo': m_store.list.pageIndex + 1,
		'pagination.pageSize': constants.PAGE_SIZE
	}
	let filterData = {}
	/**
	 * 主题
	 */
	const quantifyName = m_store.form.quantifyName
	if (quantifyName) {
		filterData['entity.eventName'] = quantifyName
	}
	/**
	 * 奖扣时间
	 */
	const startTime = m_store.form.startTime
	const endTime = m_store.form.endTime
	if (startTime && endTime) {
		filterData['dateRanges'] = [{
			name: 'recordDate',
			min: dateUtil.format(startTime, 'YYYY-MM-DD'),
			max: dateUtil.format(endTime, 'YYYY-MM-DD')
		}]
	}
	/**
	 * 状态
	 */
	const status = m_store.form.status
	if (status !== constants.ALL) {
		filterData['entity.quantify.status'] = status
	}
	return {
		...pagerData,
		...filterData
	}
}