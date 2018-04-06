import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/booking'
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    }
  ]
})
