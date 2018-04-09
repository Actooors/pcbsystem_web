import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import PassengerInfo from 'components/passengerinfo/passengerinfo'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'booking'}
    },
    {
      path: '/passenger/info',
      name: 'passengerinfo',
      component: PassengerInfo,
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    },


  ]
})
