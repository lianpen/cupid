/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	NavBar,
	Icon
} from 'antd-mobile'

class Navbar extends BaseRc {

	render() {
		return (
			<NavBar mode="light" 
			    icon={<Icon type="left" />}
			    onLeftClick={ this.backRouter }>
				填写主题
			</NavBar>
		)
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
)(Navbar)