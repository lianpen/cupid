/*
 * @Author: liulina
 * @Date:   2018-07-08 11:54:35
 */

import {
	NavBar,
	Carousel,
	Grid,
	TabBar,
	Toast,
	Icon,
	Modal
} from 'antd-mobile'
const alert = Modal.alert;
import fn from 'util/fn'
import './stage.less'
import respool from 'global/respool'
import Svg_grid01 from 'assets/svg/grid_integral.svg'
import Svg_grid02 from 'assets/svg/grid_top.svg'
import Svg_grid03 from 'assets/svg/grid_award.svg'
import Svg_grid04 from 'assets/svg/grid_check.svg'
import Svg_grid05 from 'assets/svg/grid_prize.svg'
import Svg_grid06 from 'assets/svg/grid_read.svg'
import Svg_grid07 from 'assets/svg/grid_hall.svg'
import Svg_grid08 from 'assets/svg/grid_examine.svg'
// import gActionType from 'global/actionType'

class Stage extends BaseRc {

	componentWillMount() {
		this.init()
	}

	/**
	 * 初始化
	 * 加载权限树
	 */
	async init() {

	}

	render() {
		console.log('aa')
		const windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		const pageMinH = windowH - 45;
		return (
			<div className='p-stage' style={{ minHeight: pageMinH, overflow: 'hidden', marginTop: 45 }}>
				{ this.renderNavBar() }
				{ this.renderCarousel() }
				{ this.renderGrid() }
			</div>
		)
	}

	/**
	 * 渲染导航栏
	 */
	renderNavBar() {
		return (
			<NavBar mode="light" 
				className='p-stage-navbar'>
				丘比特
			</NavBar>
		)
	}

	/**
	 * 渲染跑马灯
	 */
	renderCarousel() {
		const imgAry = [
			'./img/1.jpg',
			'./img/2.jpg',
			'./img/3.jpg'
		]
		return (
			<div style={{ height: 440 / 800 * document.documentElement.clientWidth }}>
				<Carousel className='p-stage-carousel'
					frameOverflow="visible"
					autoplay
	          		infinite>
					{
						imgAry.map(imgSrc => (
					        <img
				             	key={ imgSrc }
				              	href="javascript:;"
				              	className="p-stage-carousel-img"
				              	src={ imgSrc }
				            />
						))
					}
				</Carousel>
			</div>
		)
	}

	/**
	 * 渲染宫格
	 */
	renderGrid() {
		let data = [{
			text: '发布',
			key: 'publish',
			icon: <div className="p-stage-grid-svg_box svg_box_1"><Svg_grid01 width={ 20 } height= { 20 } className='text-white' /></div>
		}, {
			text: '大厅',
			key: 'hall',
			icon: <div className="p-stage-grid-svg_box svg_box_2"><Svg_grid02 width={ 20 } height= { 20 } className='text-white' /></div>
		}]

		return (
			<Grid data={ data }
				className='p-stage-grid'
				hasLine={ false }
				onClick={ this.onClickGrid.bind(this) } />
		)
	}

	/**
	 * 宫格点击
	 */
	onClickGrid(el) {
		const key = el.key
		this.pushRouter('/' + key)
	}

}
import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return {
		me: state.m_global.me
	}
}
const mapDispatchToProps = fn.getMapDispatchToProps([
	
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Stage)