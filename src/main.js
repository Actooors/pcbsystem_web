// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Menu, MenuItem, Button} from 'element-ui'
import LazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/css/base.css'
Vue.config.productionTip = false
// Vue.use(Element)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)

Vue.use(LazyLoad, {
  preLoad: 1.3,
  error: require('common/image/user.png'),
  loading: require('common/image/loading.png'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
