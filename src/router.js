import Vue from 'vue'
import Router from 'vue-router'
import signup from './views/signup.vue'
import selectNo from './views/select-no.vue'
import register from './views/register.vue'
import successInfo from './views/success-info.vue'

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
      path: '/selectNo',
      name: 'selectNo',
      component: selectNo
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }, {
      path: '/successInfo',
      name: 'successInfo',
      component: successInfo
    }
  ]
})
