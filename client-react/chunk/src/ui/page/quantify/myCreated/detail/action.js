/*
 * @Author: lianpen
 * @Date:   2018-06-08 10:27:54
 */

import API from 'util/API'
import model from 'model'
import urlUtil from 'util/url'

const module = {
	fetchQuantify: pageIndex => {
		const quantifyId = urlUtil.getValue('id')
		return new Promise(async resolve => {
			try {
				const resp = await API.request({
					module: 'integralQuantify',
					action: 'getQuantifyDetail',
					data: {
						'entity.id': quantifyId
					}
				})
				const quantify = new model.Quantify()
				quantify.parseDirtyQuantifyData(resp.obj)
				quantify.parseDirtyActivityList(resp.resultlist)
				quantify.parseDirtyRecordList(resp.other)
				resolve(quantify)
			} catch (error) {
				resolve(null)
			}
		})
	}
}

export default module