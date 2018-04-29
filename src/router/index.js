import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import PersonalInfo from 'components/personalinfo/personalinfo'
import History from 'components/manage/history'
import Manage from 'components/manage/manage'
import Passenger from 'group/passenger'
import Driver from 'group/driver'
import Requests from 'components/requests/requests'
import Progressing from 'components/manage/progressing'
import Applying from 'components/manage/applying'
import Form from 'components/repair/form'
import Msg from 'components/repair/msg'
import Repair from 'components/repair/repair'
import Admin from 'group/admin'
import UserManagement from 'components/usermanagement/usermanagement'
import MessageCenter from 'components/messagecenter/messagecenter'
import Begin from 'components/requests/begin'
import Progress from 'components/requests/progress'
import End from 'components/requests/end'
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
          component: PersonalInfo,
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
          // name: 'requests',
          component: Requests,
          children: [{
            path: '',
            redirect: {name:'begin'}
          },{
            path: 'begin',
            name: 'begin',
            component: Begin
          },{
            path: 'progress',
            name: 'progress',
            component: Progress
          },{
            path: 'end',
            name: 'end',
            component: End
          }]
        },
        {
          path: 'repair',
          component: Repair,
          children: [{
            path: '',
            redirect: {name: 'form'},
          }, {
            path: 'form',
            name: 'form',
            component: Form
          }, {
            path: 'msg',
            name: 'msg',
            component: Msg
          }]
        },
        {
          path: 'info',
          name: 'driverinfo',
          component: PersonalInfo,
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
        path: '',
        redirect: {name: 'messagecenter'}
      }, {
        path:'message',
        name:'messagecenter',
        component: MessageCenter
      },{
        path: 'usermanagement',
        name: 'usermanagement',
        component: UserManagement
      }]
    }

  ]
})
