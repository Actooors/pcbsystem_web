import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    uName: '艾尼瓦尔·艾合买提江',
    uId: '17111666',
    photoURL: 'http://services.shu.edu.cn/User/showPhoto.aspx'//这里最好由后端请求并存储用户头像，提供唯一接口过来,
  }
})
