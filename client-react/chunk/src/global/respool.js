/*
 * @Author: lianpen
 * @Date:   2018-06-29 14:47:04
 */

/**
 * 资源池
 * @周鸿杰 2012
 * redux有一个dispatching时不能调用store.getState()的限制
 * 思想是发起一个dispatch是一个纯粹的将原对象计算新对象的函数 所以计算过程中不该再依赖原对象
 * 所以redux模式应当使用扁平对象
 *
 * 但是我的数据模型决定了对象的深度嵌套 于是我独立出资源池 用于发布过程中的对象读取
 * 设计模式等同于pc端的store 为了区别redux的单一store 取名为资源池@周鸿杰
 */

const respool = {
	/**
	 * 事件树单例 
	 */
	activityTree: null,
	/**
	 * 部门树单例
	 */
	departmentTree: null,
	/**
	 * 权限树
	 */
	authorityTree: null,
}

window.respool = respool

export default respool