import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uName: '李瑞轩',
    uId: '16121670',
    photoURL: 'http://services.shu.edu.cn/User/showPhoto.aspx',//这里最好由后端请求并存储用户头像，提供唯一接口过来,
    where: '行政楼',
    months: 0,
    days: 0,
    hours: 0,
  },
  mutations: {
    setTimeToNow(state) {
      if (state.months !== 0)
        return
      let date = new Date()
      date.setHours(date.getHours() + 1)
      state.months = date.getMonth() + 1//获取的值介于0~11表示1~12月，因此+1
      state.days = date.getDay() + 1//同上，获取的值从0开始，因此+1
      state.hours = date.getHours()
    }
  }
})
