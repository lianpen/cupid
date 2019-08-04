/*
 * @Author: lianpen
 * @Date:   2018-06-07 17:16:12
 */
import {
	PullToRefresh,
	ListView,
	Toast
} from 'antd-mobile'
import constants from 'global/constants'
import action from './action'
import actionType from './actionType'
import Rc_QuantifyListItem from '../shared/QuantifyListItem'
import urlUtil from 'util/url'
import Rc_EmptyList from 'ui/component/emptyList/EmptyList'

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
			document.documentElement.clientHeight - 184 :
			0
		)
		const style = {
			// height: height,
			margin: '5px 0'
		}
		const rc_PullToRefresh = (
			<PullToRefresh
	          	refreshing = { this.props.refreshing }
	          	onRefresh = { this.onRefresh.bind(this) } />
		)
		return (
			<div>
      			<ListView
			        dataSource = { this.state.listViewDataSource }
			        renderFooter = { renderFooter }
					renderRow = { renderRow }
					useBodyScroll = { true }
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
	const mStore = state.m_quantify.m_myCreated.m_index
	return {
		quantifyList: mStore.quantifyList,
		totalNumber: mStore.totalNumber,
		pageIndex: mStore.pageIndex,
		refreshing: mStore.refreshing,
		pending: mStore.pending,
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