import Vue from 'vue'
Vue.use(window.cube)
Vue.config.productionTip = false
console.log(Vue.config)

import global from './plugins/global'
Vue.use(global)

import CSvg from '@/components/svg/Svg.vue'
import CGrid from '@/components/grid/Grid.vue'
import CNavbar from '@/components/navbar/Navbar.vue'
import CList from '@/components/list/List.vue'
import CListInputItem from '@/components/list/InputItem.vue'
import CListItem from '@/components/list/ListItem.vue'
import CListBrief from '@/components/list/Brief.vue'
Vue.component('c-svg', CSvg)
Vue.component('c-grid', CGrid)
Vue.component('c-navbar', CNavbar)
Vue.component('c-list', CList)
Vue.component('c-list-inputItem', CListInputItem)
Vue.component('c-list-item', CListItem)
Vue.component('c-list-brief', CListBrief)

import * as filters from '@/filter/filter'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

import App from './App.vue'
import router from './router'
import store from './store'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
