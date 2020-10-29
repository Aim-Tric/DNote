/**
 * 初始化用户设置
 * 配置存储到localStorage中
 * 用户可在设置弹框中调整配置
 * setting:
 *  toastOnSave 编辑文档后点击预览按钮保存，将会提示message框
 *  order 排序回调
 *  
 */
import vuex from '@/store'

let CONST_SETTING_KEY = "STORAGE_SETTING"

const orderWrapper = function(a, b, order) {
  if( a.topping || b.topping ) {
    if(a.topping) {
      return 1
    }
    if(b.topping) {
      return -1
    }
  }
  return (order && order(a, b)) || 1
}

const defaultOrder = function(a, b) {
  return new Date(a.updated).getTime() > new Date(b.updated).getTime() ? 1 : -1
}

class SettingConfiguration {
  constructor() {
    let storage = window.localStorage
    const json = storage.getItem(CONST_SETTING_KEY)
    this.orderWrapper = orderWrapper
    if(json) {
      this.setting = JSON.parse(json)
    } else {
      this.setting = {
        toastOnSave: true,
        order: defaultOrder,
        version: new Date()
      }
      storage.setItem(CONST_SETTING_KEY, JSON.stringify(this.setting))
    }
  }

  get(key) {
    return this.setting[key]
  }

  set(key, value) {
    this.setting[key] = value
    vuex.dispatch("setFiles", vuex.state.files)
  }

}

vuex.state.config = new SettingConfiguration()