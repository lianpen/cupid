/*
 * @Author: lianpen
 * @Date:   2018-06-12 14:06:52
 * @Desc:   表单
 */

import {
	List,
	NavBar,
	SearchBar,
	Flex,
	Button,
	Icon,
	DatePicker,
	Picker
} from 'antd-mobile'
import constants from 'global/constants'
import actionType from './actionType'
import fn from 'util/fn'

class Form extends BaseRc {

	render() {
		return (
			<div className='p-quantify_myCreated_screen_form'>
				{ this.renderNavBar() }
				{ this.renderQuantifyName() }
				{ this.renderTime() }
				{ this.renderStatus() }
				{ this.renderButtonList() }
			</div>
		)
	}

	/**
	 * 渲染头部导航
	 */
	renderNavBar() {
		return (
			<NavBar mode="light" 
			    icon={ <Icon type="left" /> }
			    onLeftClick={ this.backRouter }>
				高级筛选
			</NavBar>
		)
	}

	/**
	 * 渲染奖扣名称
	 */
	renderQuantifyName() {
		return (
			<SearchBar placeholder="搜索事件名称" 
				value={ this.props.form.quantifyName }
				className='shared-underNavbar'
				onChange={ this.onChangeFormItem.bind(this, 'quantifyName') } />
		)
	}

	/**
	 * 改变表单项
	 */
	onChangeFormItem(key, value) {
		let o = {}
		o[key] = fn.isArray(value) ? value[0] : value
		this.props[actionType.SET_FORM_ITEM](o)
	}

	/**
	 * 渲染时间
	 */
	renderTime() {
		const renderHeader = () => '奖扣时间'
		return (
			<List renderHeader={ renderHeader }>
		        <DatePicker
		          	value={ this.props.form.startTime }
		          	onChange={ this.onChangeFormItem.bind(this, 'startTime') }
		          	mode="date">
	        		<List.Item arrow="horizontal">
	        			起始时间
	        		</List.Item>
        		</DatePicker>
		        <DatePicker
		          	value={ this.props.form.endTime }
		          	onChange={ this.onChangeFormItem.bind(this, 'endTime') }
		          	mode="date">
	        		<List.Item arrow="horizontal">
	        			结束时间
	        		</List.Item>
        		</DatePicker>
      		</List>
		)
	}

	/**
	 * 渲染状态
	 */
	renderStatus() {
		const renderHeader = () => '审核状态'
		const data = [{
			value: constants.ALL,
			label: '全部状态'
		}, {
			value: constants.CHECK_STATUS.AT_PREPARE,
			label: constants.CHECK_STATUS_TEXT.AT_PREPARE
		}, {
			value: constants.CHECK_STATUS.TO_FIRST_CHECK,
			label: constants.CHECK_STATUS_TEXT.TO_FIRST_CHECK
		}, {
			value: constants.CHECK_STATUS.TO_FINAL_CHECK,
			label: constants.CHECK_STATUS_TEXT.TO_FINAL_CHECK
		}, {
			value: constants.CHECK_STATUS.PASSED,
			label: constants.CHECK_STATUS_TEXT.PASSED
		}]
		return (
			<List renderHeader={ renderHeader }>
				<Picker data={ data }
					value={ [this.props.form.status] }
					onChange={ this.onChangeFormItem.bind(this, 'status')}  
					cols={ 1 }>
	        		<List.Item arrow="horizontal">
	        			审核状态
	        		</List.Item>
	        	</Picker>
      		</List>
		)
	}

	/**
	 * 渲染按钮组
	 */
	renderButtonList() {
		return (
			<Flex style={{ margin: '30px 15px' }}>
	      		<Flex.Item>
	  				<Button onClick={ this.props[actionType.RESET_FORM_ITEM] }>
	  					重置
	  				</Button>
	      		</Flex.Item>
	      		<Flex.Item>
	    			<Button type="primary"
	    				onClick={ this.pushRouter.bind(this, '/quantify/myRelated/screen/list') }>
	    				查询
	    			</Button>
	      		</Flex.Item>
	    	</Flex>
		)
	}

}

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	const mStore = state.m_quantify.m_myRelated.m_screen
	return {
		form: mStore.form
	}
}

const mapDispatchToProps = fn.getMapDispatchToProps([
	actionType.SET_FORM_ITEM,
	actionType.RESET_FORM_ITEM
])

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form)