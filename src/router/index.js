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
import AllInfo from 'components/manage/allinfo'
import Form from 'components/repair/form'
import Msg from 'components/repair/msg'
import Repair from 'components/repair/repair'
import Admin from 'group/admin'
import UserManagement from 'components/usermanagement/usermanagement'
import MessageCenter from 'components/messagecenter/messagecenter'
import Begin from 'components/requests/begin'
import Progress from 'components/requests/progress'
import End from 'components/requests/end'
import Login from 'components/login/login'
import Passengers from 'components/usermanagement/passengers'
import Drivers from 'components/usermanagement/drivers'
import Cars from 'components/usermanagement/cars'
import 'element-ui/lib/theme-chalk/index.css'
import ErrorPage404 from 'components/errorpage/errorpage404'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'booking'}
    }, {
      path: '/passenger',
      component: Passenger,
      meta: {requiresAuth: ['passenger']},
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
          },{
            path: 'allinfo',
            name: 'allinfo',
            component: AllInfo
          }]
        }
      ]
    },
    {
      path: '/driver',
      component: Driver,
      meta: {title: '公车预约系统司机端', requiresAuth: ['driver']},
      children: [{
        path: '',
        redirect: {name: 'requests'}
      },
        {
          path: 'requests',
          name: 'requests',
          component: Requests,
          children: [{
            path: '',
            redirect: {name: 'begin'}
          }, {
            path: 'begin',
            name: 'begin',
            component: Begin
          }, {
            path: 'progress',
            name: 'progress',
            component: Progress
          }, {
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
      meta: {
        title: '公车预约系统管理端',
        requiresAuth: ['admin']
      },
      children: [{
        path: '',
        redirect: {name: 'messagecenter'}
      }, {
        path: 'message',
        name: 'messagecenter',
        component: MessageCenter
      }, {
        path: 'usermanagement',
        name: 'usermanagement',
        component: UserManagement,
        children: [{
          path: '',
          redirect: {name: 'passenagers'}
        }, {
          path: 'passenagers',
          name: 'passenagers',
          component: Passengers
        }, {
          path: 'drivers',
          name: 'drivers',
          component: Drivers
        }, {
          path: 'cars',
          name: 'cars',
          component: Cars
        }]
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录 - 上海大学公车预约系统'
      }
    },
    {
      path: '/logintest',
      name: 'logintest',
      component: Admin,
      meta: {}
    },
    {
      path: '*',
      component: ErrorPage404,
      meta: {title: '404 not found'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  let bypassAuthWhileDev = true
  if (bypassAuthWhileDev && process.env.NODE_ENV !== 'development') {
    //验证是否需要登录
    let token = window.localStorage.getItem('token')
    let userIdentity = localStorage.getItem('userIdentity')
    let needAuth = to.matched.some(record => record.meta.hasOwnProperty('requiresAuth') && record.meta.requiresAuth)
    console.log(token, userIdentity, needAuth)
    //如果token不存在、页面需要验证
    if (!token && needAuth) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
      //next后函数不会返回，故手动加return
      return
    } else if (token && needAuth) {
      //有token，页面需要验证
      let authSuccess = to.matched.some(record => {
        if (record.meta.requiresAuth != null) {
          return record.meta.requiresAuth.some(record => record === userIdentity)
        }
        return false
      })
      if (!authSuccess) {
        //当前身份无权访问该页面
        next(false)
        return
      }
    }
  }

  //匹配并修改单个页面标题，若没有设置页面标题则设为父组件标题，若标题树为空，则置为defaultTitle
  const defaultTitle = "上海大学公车预约系统"
  let len = to.matched.length
  for (var i = len - 1; i >= 0 && !to.matched[i].meta.title; i--) ;
  if (i >= 0) {
    document.title = to.matched[i].meta.title
  } else {
    document.title = defaultTitle
  }
  next()
})

export default router



