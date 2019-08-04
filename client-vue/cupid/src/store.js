import Vue from 'vue'
import Vuex from 'vuex'
import model from 'model'
Vue.use(Vuex)

import viewsStore from './views/viewsStore'
import globalStore from './global/globalStore'

let module = {
		modules: {
				views: viewsStore,
				global: globalStore
		}
}

let store = new Vuex.Store(module)

export default store
