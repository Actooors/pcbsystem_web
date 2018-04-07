import Vue from 'vue'
import Router from 'vue-router'
import Booking from 'components/booking/booking'
import User from 'components/main/user'
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
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/reservation',
<<<<<<< 13b3a6533d4ee39c9d26cac1594efd847aabe8df
      name:
        'reservation',
      component:
      Reservation
=======
      name: 'reservation',
      component: Reservation
    },
    {
      path: '/personalinfo',
      name: 'personalinfo',
      component: PersonalInfo
>>>>>>> 添加个人信息框架(未修改)
    }
  ]
})
