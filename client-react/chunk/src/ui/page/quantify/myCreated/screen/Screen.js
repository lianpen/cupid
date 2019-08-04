/*
 * @Author: lianpen
 * @Date:   2018-06-07 10:21:45
 * @Desc:   高级筛选
 */

import {
	Switch,
	Route
} from 'react-router-dom'

import Rc_Form from './Form'
import Rc_List from './List'

export default class MyCreated extends BaseRc {

	render() {
		return (
			<div className='module-quantify'>
				<Switch>
	                <Route path='/quantify/myCreated/screen' exact component={ Rc_Form } />
	                <Route path='/quantify/myCreated/screen/form' component={ Rc_Form } />
	                <Route path='/quantify/myCreated/screen/list' component={ Rc_List } />
	            </Switch>
            </div>
		)
	}

}