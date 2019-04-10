import Vue from 'vue'
import Router from 'vue-router'
import signup from './views/signup1080.vue'
import selectNo from './views/select-no.vue'
import register from './views/register.vue'
import regSuccess from './views/reg-success.vue'
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
    },    
    {
      path: '/registerSuccess',
      name: 'regSucess',
      component: regSuccess
    },
    {
      path: '/successInfo',
      name: 'successInfo',
      component: successInfo
    }
  ]
})
