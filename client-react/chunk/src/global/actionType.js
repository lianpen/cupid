/*
 * @Author: lianpen
 * @Date:   2018-03-29 09:54:13
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-05-02 13:48:21
 */

const module = [{
	type: 'LOGON',
	desc: '登录'
}, {
	type: 'NOTICE',
	desc: '公告'
}]

const prefix = 'global'

import fn from 'util/actionType'

export default fn(module, prefix)