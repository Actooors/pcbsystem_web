import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    uName: '李瑞轩',
    uId: '16121670',
    photoURL: 'http://services.shu.edu.cn/User/showPhoto.aspx',//这里最好由后端请求并存储用户头像，提供唯一接口过来,
    where: '行政楼',
    bDate: undefined,
    eDate: undefined,
  },
  mutations: {
    InitDate(state) {
      if (state.bDate !== undefined)
        return
      let date = new Date()
      date.setHours(date.getHours() + 1)
      state.bDate = new Date(date)
      date.setHours(date.getHours() + 3)
      state.eDate = date
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
