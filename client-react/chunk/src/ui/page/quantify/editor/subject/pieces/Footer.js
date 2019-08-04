/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	List,
	Flex,
	Button
} from 'antd-mobile'
import action from '../action'

class Footer extends BaseRc {

	render() {
		return (
			<div className='shared-bottomSubmit c-footer shared-border-top'>
				<Button
					className="shared-bottomSubmit-two_left"
					type="ghost"
					inline
					onClick={ this.backRouter } >
					上一步
				</Button>
				<Button type='primary'
					className="shared-bottomSubmit-two_right"
					inline
					onClick={ this.onSubmit.bind(this) }>
		    		提交
				</Button>
			</div>
		)
	}

	/**
	 * 提交
	 */
	onSubmit() {
		action.submit()
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		quantify: state.m_quantify.m_editor.quantify
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)