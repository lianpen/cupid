/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import Rc_Navbar from './pieces/Navbar'
import Rc_Name from './pieces/Name'
import Rc_Date from './pieces/Date'
import Rc_Statistic from './pieces/Statistic'
import Rc_Checker from './pieces/Checker'
import Rc_Copy from './pieces/Copy'
import Rc_RewardList from 'ui/component/rewardList/RewardList'
import Rc_Footer from './pieces/Footer'
import Rc_CheckModal from './CheckModal'
import './subject.less'

class Subject extends BaseRc {

	render() {
		return (
			<div className='p-quantify-editor-subject'>
				<Rc_Navbar />
				<div className='shared-underNavbar' />
				<Rc_Name />
				<Rc_Date />
				<Rc_Statistic />
				<Rc_Checker />
				<Rc_Copy />
				<Rc_RewardList quantify={ this.props.quantify } />
				<Rc_Footer />
				<Rc_CheckModal />
			</div>
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

export default connect(
	mapStateToProps
)(Subject)