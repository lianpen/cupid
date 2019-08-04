

import {
	Switch,
	Route
} from 'react-router-dom'
import BaseRc from 'BaseRc'
import Rc_Index from './index/Index'
import Rc_Questionnaire from './questionnaire/Questionnaire'

export default class Hall extends BaseRc {

	render() {
		return (
			<div className='module-hall'>
				<Switch>
	                <Route path='/hall' exact component={ Rc_Index } />
	                <Route path='/hall/index' component={ Rc_Index } />
	                <Route path='/hall/questionnaire' component={ Rc_Questionnaire } />
	            </Switch>
            </div>
		)
	}

}