import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentFileIndex: 0,
    folderId: 0,
    user: null,
    target: null,
    files: [],
    folders: [],
    visible: false,
    config: {}
  },
  mutations: {},
  actions: {
    notifyViewer({ commit, state }, index) {
      state.currentFileIndex = index
    },
    setContextMenuVisibility({ commit, state }, visible) {
      state.visible = visible
    },
    initFolders({ commit, state }, folders) {
      state.folders = folders
    },
    notifyListManager({ commit, state }, id) {
      state.folderId = id
    },
    createFile({ commit, state }, file) {
      state.invokeId = file.id
      state.files.push(file)
    },
    createFolder({ commit, state }, folder) {
      state.folders.push(folder)
    },
    clearTarget({ commit, state }) {
      state.target = null
    },
    setTarget({ commit, state }, target) {
      state.target = target
    },
    setFiles({ commit, state }, files) {
      let order = state.config.get("order")
      order && files.sort((a, b) => order(a, b, order))
      state.files = files
    }
  },
  getters: {
    isLogin(state) {
      return state.user != null
    },
    getTarget(state) {
      return state.target
    }
  }
});
