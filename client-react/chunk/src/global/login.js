/*
 * @Author: lianpen
 * @Date:   2018-07-04 13:32:03
 * @Desc:   登录 生产环境
 */

import store from 'store'
import actionType from './actionType'

/**
 * 登录入口
 */
async function login() {
	alert(location.href)
	let access_token = await getAccessToken()
	alert(access_token)
	let userId = await getUserId(access_token)
	alert(userId)
}

/**
 * 获取令牌
 */
function getAccessToken() {
	return new Promise(resolve => {
		const corpid = 'wx11e0e0dd2a8fdd0d'
		const corpsecret = '1sBeONrfYEkwU281xNUdT3jEgG9VrsElH5ab0hK0p2Y'
		const url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + corpid + '&corpsecret=' + corpsecret
		fetch(url, {
				method: "GET"
			})
			.then(data => {
				alert(data)
				return data.json()
			})
			.then(resp => {
				alert('获取access_token接口返回：' + resp)
				resolve(resp.access_token)
			})
			.catch(error => {
				alert('获取access_token接口抛错' + error)
			})
	})
}

/**
 * 获取用户Id
 */
function getUserId(access_token) {
	return new Promise(resolve => {
		const agentid = '1000002'
		const url = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=' + access_token + '&code=' + code + '&agentid=' + agentid
		fetch(url, {
				method: "GET"
			})
			.then(data => {
				return data.json()
			})
			.then(resp => {
				alert('获取UserId接口返回：' + resp)
				resolve(resp.UserId)
			})
			.catch(error => {
				alert('获取UserId接口抛错' + error)
			})
	})
}

export default {
	login
}