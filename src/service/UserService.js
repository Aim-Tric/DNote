import vuex from "@/store"
import qs from "qs"
import Vue from "vue"

const axios = Vue.axios

// 登录
export function login(noteUser, success, failure) {
  axios.post("/api/auth/login", qs.stringify(noteUser), {
        headers: {
           'content-type': 'application/x-www-form-urlencoded',
        }
      }).then(resp => {
          if (resp.code === 10000) {
            getUserBreif().then(r => {
              vuex.state.user = r.data
              sessionStorage.setItem("user", r.data)
              success(resp.msg)
            })
          } else {
            failure(resp.msg)
          }
      }).catch(failure)
}

export async function getUserBreif() {
  return await axios.get("/api/auth/info")
}

//注册
export function register(noteUser, success, failure) {
  axios.post("/api/auth/register", JSON.stringify(noteUser)).then(resp => {
    if (resp.status === 200) {
      success(resp.data)
    } else {
      failure(resp.data)
    }
  }).catch(failure)
}

// 注销
export async function logout() {
  return await axios.get("/api/auth/logout")
}

// 更新用户信息
export async function update(user) {
  return await axios.post("/api/auth/update", JSON.stringify(user))
}