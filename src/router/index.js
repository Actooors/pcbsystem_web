import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import User from 'components/main/user'
import Reservation from 'components/reservation/reservation'
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
      component:Booking
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/reservation',
      name:
        'reservation',
      component:
      Reservation
    }
  ]
})
