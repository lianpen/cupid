import Vue from 'vue'

import CSvg from '~/components/common/svg/Svg.vue'
import CGrid from '~/components/common/grid/Grid.vue'
import CNavbar from '~/components/common/navbar/Navbar.vue'
import CList from '~/components/common/list/List.vue'
import CListInputItem from '~/components/common/list/InputItem.vue'
import CListItem from '~/components/common/list/ListItem.vue'
import CListBrief from '~/components/common/list/Brief.vue'

export default () => {
	Vue.component('c-svg', CSvg)
	Vue.component('c-grid', CGrid)
	Vue.component('c-navbar', CNavbar)
	Vue.component('c-list', CList)
	Vue.component('c-list-inputItem', CListInputItem)
	Vue.component('c-list-item', CListItem)
	Vue.component('c-list-brief', CListBrief)
}
