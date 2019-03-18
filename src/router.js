import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/aa',

        }, {
            path: '/aa',
            name: 'aa',
            component: () =>
                import ('./views/aa.vue')
        },
        {
            path: '/authManage',
            name: 'authManage',
            component: () =>
                import ('./views/authManage.vue')
        },
        {
            path: '/roleManage',
            name: 'roleManage',
            component: () =>
                import ('./views/roleManage.vue')
        },
    ],
})