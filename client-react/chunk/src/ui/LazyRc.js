/*
 * @Author: lianpen
 * @Date:   2018-04-25 10:21:45
 * @Last Modified by:   lianpen
 * @Last Modified time: 2018-04-25 10:26:41
 */

/**
 * 动态路由
 */

import BaseRc from 'BaseRc'
import {
	Toast
} from 'antd-mobile'

export default class LazyBundle extends BaseRc {

	constructor(props) {
		super(props)
		this.state = {
			mod: null
		}
	}

	componentWillMount() {
		this.load(this.props)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.load !== this.props.load) {
			this.load(nextProps)
		}
	}

	load(props) {
		this.setState({
			mod: null
		})
		const context = this
		props.load(mod => {
			context.setState.call(context, {
				mod: mod.default ? mod.default : mod
			})
		})
	}

	render() {
		if (!this.state.mod) {
			return false
		}
		return this.props.children(this.state.mod)
	}

}