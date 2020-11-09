import axios from "axios"
import Vue from "vue"
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios)

const instance = Vue.axios
const vm = new Vue()

instance.defaults.withCredentials = true
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
);

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.statusCodeValue === 400) {
        vm.$message.error("请登录")
        setTimeout(function () {
          window.location = "/login"
        }, 500)
        return Promise.reject(response)
      }
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  }
);
