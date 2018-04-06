import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    uName: '李瑞轩',
    uId: '16121670',
    photoURL: 'http://services.shu.edu.cn/User/showPhoto.aspx'//这里最好由后端请求并存储用户头像，提供唯一接口过来,
  }
})
