import {
	HashRouter
} from 'react-router-dom';

import './index.less'

import RootRoute from './RootRoute'

class Index extends React.Component {

	render() {
		return (
			<HashRouter>
	            <RootRoute />
	        </HashRouter>
		)
	}

	componentDidCatch(error) {
		alert(error)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		m_global: state.m_global
	}
}

export default connect(
	mapStateToProps
)(Index)