/*
 * @Author: lianpen
 * @Date:   2018-06-12 14:06:52
 */
/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	PullToRefresh,
	ListView,
	NavBar,
	Icon,
	Toast
} from 'antd-mobile'
import constants from 'global/constants'
import action from './action'
import actionType from './actionType'
import Rc_QuantifyListItem from '../shared/QuantifyListItem'
import Rc_EmptyList from 'ui/component/emptyList/EmptyList'
import urlUtil from 'util/url'

class List extends BaseRc {

	constructor(props) {
		super(props)
		this.state = {
			/**
			 * ListView封装的数据模型
			 */
			listViewDataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		}
	}

	componentWillMount() {
		document.body.style.overflow = 'hidden'
		this.init()
	}

	/**
	 * 初始化
	 */
	async init() {
		Toast.loading('', 0)
		this.props[actionType.RESET_FETCH_LIST_0]()
		const data = await action.fetchList()
		this.props[actionType.RESET_FETCH_LIST_1](data)
		Toast.hide()
	}

	componentWillUnmount() {
		document.body.style.overflow = 'auto'
	}

	// If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
	componentWillReceiveProps(nextProps) {
		if (nextProps.quantifyList !== this.props.quantifyList) {
			this.setState({
				listViewDataSource: this.state.listViewDataSource.cloneWithRows(nextProps.quantifyList)
			})
		}
	}

	/**
	 * 上面下拉刷新 
	 */
	async onRefresh() {
		if (this.props.refreshing) {
			return
		}
		this.props[actionType.RESET_FETCH_LIST_0]()
		const data = await action.fetchList()
		this.props[actionType.RESET_FETCH_LIST_1](data)
	}

	/**
	 * 下面滚到底部刷新
	 */
	async onEndReached() {
		if (this.props.refreshing || this.props.pending) {
			return
		}
		if (this.isLastPage()) {
			return
		}
		this.props[actionType.FETCH_LIST_0]()
		const data = await action.fetchList()
		this.props[actionType.FETCH_LIST_1](data)
	}

	/**
	 * 是否已经是最后一页了
	 */
	isLastPage() {
		const {
			totalNumber,
			pageIndex
		} = this.props
		const PAGE_SIZE = constants.PAGE_SIZE
		const totalPageNumber = parseInt((totalNumber - 1) / PAGE_SIZE) + 1
		return pageIndex >= totalPageNumber - 1
	}


	render() {
		return (
			<div className='p-quantify_myCreated_screen_list'>
				{ this.renderNavBar() }
				{ this.renderList() }
			</div>
		)
	}

	/**
	 * 渲染列表
	 */
	renderList() {
		const renderRow = (quantify) => {
			return (
				<Rc_QuantifyListItem quantify = { quantify } 
					key = { quantify.data.id }
					onClick={ this.onClickRow.bind(this, quantify) } />
			)
		}
		const renderFooter = () => {
			return (
				<div style = {{ padding: 30, textAlign: 'center' }}>
          			{ this.props.pending ? '加载中 请稍后。。。' : '' }
    			</div>
			)
		}
		const height = (
			this.props.quantifyList.length ?
			document.documentElement.clientHeight - 40 :
			0
		)
		const style = {
			height: height,
			margin: '5px 0',
		}
		const rc_PullToRefresh = (
			<PullToRefresh
	          	refreshing = { this.props.refreshing }
	          	onRefresh = { this.onRefresh.bind(this) } />
		)
		return (
			<div className='shared-underNavbar'>
      			<ListView
			        dataSource = { this.state.listViewDataSource }
			        renderFooter = { renderFooter }
					renderRow = { renderRow }
					useBodyScroll = { false }
					style = { style }
					pullToRefresh = { rc_PullToRefresh }
					onEndReached = { this.onEndReached.bind(this) }
					onEndReachedThreshold = { 40 }
					scrollEventThrottle = { 0 }
					pageSize = { constants.PAGE_SIZE } /> 
				{ this.renderEmptyList() }
			</div>
		)
	}

	/**
	 * 渲染空列表
	 */
	renderEmptyList() {
		if (!this.props.quantifyList.length && !this.props.refreshing) {
			return (
				<Rc_EmptyList />
			)
		} else {
			return null
		}
	}

	/**
	 * 渲染头部导航
	 */
	renderNavBar() {
		return (
			<NavBar mode="light" 
			    icon={ <Icon type="left" /> }
			    onLeftClick={ this.backRouter }>
				搜索结果
			</NavBar>
		)
	}

	/**
	 * 点击行
	 */
	onClickRow(quantify) {
		const search = urlUtil.getSearch({
			id: quantify.data.id
		})
		const url = '/quantify/myCreated/detail?' + search
		this.pushRouter(url)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const mStore = state.m_quantify.m_myCreated.m_screen
	return {
		quantifyList: mStore.list.quantifyList,
		pageIndex: mStore.list.pageIndex,
		refreshing: mStore.list.refreshing,
		pending: mStore.list.pending,
		totalNumber: mStore.list.totalNumber
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.FETCH_LIST_0,
	actionType.FETCH_LIST_1,
	actionType.RESET_FETCH_LIST_0,
	actionType.RESET_FETCH_LIST_1
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List)