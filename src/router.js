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
            import('./views/aa.vue')
    },
    {
        path: '/authManage',
        name: 'authManage',
        component: () =>
            import('./views/authManage.vue')
    },
    {
        path: '/roleManage',
        name: 'roleManage',
        component: () =>
            import('./views/roleManage.vue')
    },
    {
        path: '/menuManage',
        name: 'menuManage',
        component: () =>
            import('./views/menuManage.vue')
    },
    {
        path: '/groupManage',
        name: 'groupManage',
        component: () =>
            import('./views/groupManage.vue')
    },
    {
        path: '/classifyManage4',
        name: 'classifyManage4',
        component: () =>
            import('./views/classifyManage4.vue')
    },
    {
        path: '/emailManage',
        name: 'emailManage',
        component: () =>
            import('./views/emailManage.vue')
    },
    {
        path: '/passManage',
        name: 'passManage',
        component: () =>
            import('./views/passManage.vue')
    },
    {
        path: '/integralManage',
        name: 'integralManage',
        component: () =>
            import('./views/integralManage.vue')
    },
    {
        path: '/integralManage',
        name: 'integralManage',
        component: () =>
            import('./views/integralManage.vue')
    },
    ],
})

