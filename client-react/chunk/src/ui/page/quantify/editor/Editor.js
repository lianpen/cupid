/*
 * @Author: lianpen
 * @Date:   2018-06-07 10:21:45
 */

import {
	Switch,
	Route
} from 'react-router-dom'
import Rc_RewardList from './rewardList/RewardList'
import Rc_Subject from './subject/Subject'
import Rc_Result from './result/Result'

export default class MyCreated extends BaseRc {

	render() {
		return (
			<div className='module-quantify'>
				<Switch>
	                <Route path='/quantify/editor' exact component={ Rc_RewardList } />
	                <Route path='/quantify/editor/rewardList' component={ Rc_RewardList } />
	                <Route path='/quantify/editor/subject' component={ Rc_Subject } />
	                <Route path='/quantify/editor/result' component={ Rc_Result } />
	            </Switch>
            </div>
		)
	}

}