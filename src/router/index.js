import Vue from 'vue'
import Router from 'vue-router'
import User from 'components/main/user'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/user'
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
