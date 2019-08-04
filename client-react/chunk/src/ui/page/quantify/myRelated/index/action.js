/*
 * @Author: lianpen
 * @Date:   2018-06-08 10:27:54
 */

import API from 'util/API'
import store from 'store'
import constants from 'global/constants'
import model from 'model'
import moment from 'moment'

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
	const m_store = store.getState().m_quantify.m_myRelated.m_index
	const pagerData = {
		'pagination.pageNo': m_store.pageIndex + 1,
		'pagination.pageSize': constants.PAGE_SIZE
	}
	let filterData = {}
	const status = m_store.filter.status
	if (status !== constants.ALL) {
		filterData['entity.quantify.status'] = status
	}
	const time = m_store.filter.time
	if (time !== constants.ALL) {
		const startMomentIns = moment(time)
		const endMomentIns = startMomentIns.clone().add(1, 'months').add(-1, 'days')
		filterData['dateRanges'] = [{
			name: 'recordDate',
			min: startMomentIns.format('YYYY-MM-DD'),
			max: endMomentIns.format('YYYY-MM-DD'),
		}]
	}
	return {
		...pagerData,
		...filterData
	}
}