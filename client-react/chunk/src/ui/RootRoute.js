/*
 * @Author: lianpen
 * @Date:   2018-06-06 10:17:26
 */

/*
 * @Author: lianpen
 * @Date:   2018-05-11 15:49:02
 */

import {
	Switch,
	Route
} from 'react-router-dom'

/**
 * 工作台
 */
import Rc_Stage from 'ui/page/stage/Stage.bundle'
/**
 * 发布问卷
 */
import Rc_Publish from 'ui/page/publish/Publish.bundle'
/**
 * 大厅
 */
import Rc_Hall from 'ui/page/hall/Hall.bundle'

import LazyRc from 'ui/LazyRc'

export default class RootRoute extends React.Component {

	/**
	 * 渲染路由
	 */
	render() {
		const lazy = comp => (
			props => {
				const fn = Rc => {
					if (typeof Rc != 'function') return null
					return (
						<Rc { ...props } />
					)
				}
				return (
					<LazyRc load={ comp }>
                        { fn }
                    </LazyRc>
				)
			}
		)
		return (
			<Switch>
                <Route path='/' exact component={ lazy(Rc_Stage) } />
                <Route path='/stage' component={ lazy(Rc_Stage) } />
                <Route path='/publish' component={ lazy(Rc_Publish) } />
                <Route path='/hall' component={ lazy(Rc_Hall) } />
            </Switch>
		)
	}

}