/*
 * @Author: lianpen
 * @Date:   2018-03-29 09:54:13
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-04-20 16:20:53
 */

/**
 * app初始化
 */

import env from '../../env'
import store from 'store'
import actionType from './actionType'
import urlUtil from 'util/url'
import {
	Toast
} from 'antd-mobile'

export function initApp() {
	const env = store.getState().m_global.env
	let code = urlUtil.getValue('code')
	let corpid = urlUtil.getValue('corpid') || 'wx11e0e0dd2a8fdd0d'
	//corpid = 'wx11e0e0dd2a8fdd0d'
	return
	store.dispatch({
		type: actionType.LOGON,
		data: JSON.parse(localStorage.me).obj
	})
}