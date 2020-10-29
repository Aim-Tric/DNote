import * as UserService from '@/service/UserService'
import vuex from "@/store"

export function logout() {
  UserService.logout()
  window.location = '/login'
}

export async function getUserInfo() {
  let resp = await UserService.getUserBreif()
  vuex.state.user = resp.data
}

export function updateUserInfo(success) {
  UserService.update(vuex.state.user).then(resp => {
    if(resp.status = 200) {
      success(resp)
    } else {
      failure(resp.data)
    }
  })
}