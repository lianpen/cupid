import Vue from 'vue'
import Router from 'vue-router'
import Stage from './views/Stage.vue'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'stage',
        component: Stage
    }, {
        path: '/stage',
        name: 'stage',
        component: Stage
    }, {
        path: '/hall',
        name: 'hall',
        component: () =>
            import ('./views/hall/Hall.vue')
    }, {
        path: '/questionnaire/:id',
        name: 'questionnaire',
        component: () =>
            import ('./views/questionnaire/Questionnaire.vue')
    }, {
        path: '/publish',
        name: 'publish',
        component: () => 
            import ('./views/publish/Publish.vue')
    }]
})