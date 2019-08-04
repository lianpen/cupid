/*
 * @Author: lianpen
 * @Date:   2018-06-07 10:21:45
 */

import {
	Switch,
	Route
} from 'react-router-dom'

import Rc_Index from './index/Index'
import Rc_Screen from './screen/Screen'
import Rc_Detail from './detail/Detail'

export default class MyRelated extends BaseRc {

	render() {
		return (
			<div className='module-quantify'>
				<Switch>
	                <Route path='/quantify/myRelated' exact component={ Rc_Index } />
	                <Route path='/quantify/myRelated/index' component={ Rc_Index } />
	                <Route path='/quantify/myRelated/screen' component={ Rc_Screen } />
	                <Route path='/quantify/myRelated/detail' component={ Rc_Detail } />
	            </Switch>
            </div>
		)
	}

}