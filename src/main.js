// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import LazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/css/base.css'
import Fastclick from 'fastclick'


Vue.config.productionTip = false
Vue.use(Element)
Vue.use(LazyLoad, {
  preLoad: 1.3,
  error: require('common/image/user.png'),
  loading: require('common/image/loading.png'),
  attempt: 1,
})

Fastclick.attach(document.body)
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
