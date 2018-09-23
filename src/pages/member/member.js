import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const router = new Router({
    routes: [{
            path: '/',
            component: () =>
                import('./components/member.vue')
        },
        {
            path: '/address',
            component: () =>
                import('./components/address.vue'),

            children: [{
                    path: '',
                    redirect: 'all'
                },
                {
                    path: 'all',
                    component: () =>
                        import('./components/all.vue')
                },
                {
                    path: 'form',
                    component: () =>
                        import('./components/form.vue')
                }
            ]
        }
    ]
})


new Vue({
    el: '#app',
    router,
})