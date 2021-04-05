// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import moment from 'moment'
import store from "./store"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.filter('moment', function (value, formatSring) {
  formatSring = formatSring || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format('YYYY-MM-DD')
})

// 注册一个全局前置守卫，判断用户是否登录
router.beforeEach(function (to, from, next) {
  if (to.path === '/') {
    next()
  } else {
    let token = window.localStorage.token
    if (token === "null" || token === "" || token === undefined) {
      next("/")
    } else {
      next()
    }
  }
})
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common['token'] = store.state.token.token
    }
    return config
  },
  error => {
    // 请求错误
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token")
          router.replace({
            path: "/",
            quert: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
