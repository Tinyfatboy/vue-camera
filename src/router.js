import Vue from 'vue'
import Router from 'vue-router'
import signup from './views/signup.vue'
import select from './views/select.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/signup'
    },
    {
      path: '/signup',
      name: 'about',
      component: signup
    },
    {
      path: '/select',
      name: 'select',
      component: select
    }
  ]
})
