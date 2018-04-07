import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import Reservation from 'components/reservation/reservation'
import PersonalInfo from 'components/personalinfo/personalinfo'
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
      path: '/reservation',
      name: 'reservation',
      component: Reservation
    },
    {
      path: '/personalinfo',
      name: 'personalinfo',
      component: PersonalInfo
    }
  ]
})
