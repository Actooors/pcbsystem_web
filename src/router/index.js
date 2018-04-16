import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import PassengerInfo from 'components/passengerinfo/passengerinfo'
import History from 'components/history/history'
import Passenger from 'group/passenger'
import Driver from 'group/driver'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'booking'}
    }, {
      path: '/passenger',
      component: Passenger,
      children: [{
        path: '',
        redirect: {name: 'booking'}
      }, {
        path: 'booking',
        name: 'booking',
        component: Booking
      }, {
        path: 'info',
        name: 'passengerinfo',
        component: PassengerInfo,
      }, {
        path: 'history',
        name: 'history',
        component: History
      }]
    },
    {
      path: '/driver',
      component: Driver,
      children: [{
        path: '',
        redirect: {name: 'booking'}
      }, {
        path: 'booking',
        name: 'booking',
        component: Booking
      }, {
        path: 'info',
        name: 'passengerinfo',
        component: PassengerInfo,
      }, {
        path: 'history',
        name: 'history',
        component: History
      }]
    }

  ]
})
