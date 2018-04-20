import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import PassengerInfo from 'components/passengerinfo/passengerinfo'
import History from 'components/history/history'
import Manage from 'components/manage/manage'
import Passenger from 'group/passenger'
import Driver from 'group/driver'
import Requests from 'components/requests/requests'
import Progressing from 'components/progressing/progressing'
import Applying from 'components/applying/applying'
import Repair from 'components/repair/repair'
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
      },
        {
          path: 'booking',
          name: 'booking',
          component: Booking
        },
        {
          path: 'info',
          name: 'passengerinfo',
          component: PassengerInfo,
        },
        {
          path: 'manage',
          // name: 'manage',
          component: Manage,
          children: [{
            path: '',
            redirect: {name: 'progressing'},
          }, {
            path: 'progressing',
            name: 'progressing',
            component: Progressing,
          }, {
            path: 'applying',
            name: 'applying',
            component: Applying
          }, {
            path: 'history',
            name: 'history',
            component: History
          }]
        }
      ]
    },
    {
      path: '/driver',
      component: Driver,
      children: [{
        path: '',
        redirect: {name: 'requests'}
      },
        {
          path: 'requests',
          name: 'requests',
          component: Requests
        },
        {
          path: 'repair',
          name: 'repair',
          component: Repair
        },
        {
          path: 'info',
          name: 'passengerinfo',
          component: PassengerInfo,
        }
      ]
    }

  ]
})
