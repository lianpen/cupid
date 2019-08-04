/*
 * @Author: lianpen
 * @Date:   2018-06-07 10:21:45
 */

import {
	Switch,
	Route
} from 'react-router-dom'

import './quantify.less'
export default class Quantify extends BaseRc {

	render1() {
		return (
			<div className='module-quantify'>
				<Switch>
	            </Switch>
            </div>
		)
	}

	render1() {
		return (
			<div className='module-quantify'>
				<Switch>
	                <Route path='/quantify' exact component={ Rc_MyCreated } />
	                <Route path='/quantify/myCreated' component={ Rc_MyCreated } />
	                <Route path='/quantify/myRelated' component={ Rc_MyRelated } />
	                <Route path='/quantify/editor' component={ Rc_Editor } />
	            </Switch>
            </div>
		)
	}

}