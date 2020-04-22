const state = {
  playingLive: '',
  playingRecord: '',
  courseType: 2, // 0 直播 1 录播
  configBl: { // 保利威视录播配置信息
    vid: '',
    playsafe: '',
    recordId: 0
  },
  configZs: {},
  token: '',
  emptyDataObj: {
    status: '',
    text: ''
  },
  testData: {} // 记录传性格测试结果页数据
}
const getters = {
  playingLive: state => state.playingLive,
  playingRecord: state => state.playingRecord,
  courseType: state => state.courseType,
  configBl: state => state.configBl,
  token: state => state.token,
  emptyDataObj: state => state.emptyDataObj,
  testData: state => state.testData
}
const actions = {
  getPlayingLive ({commit}, val) {
    commit('setPlayingLive', val)
  },
  getPlayingRecord ({commit}, val) {
    commit('setPlayingRecord', val)
  },
  getCourseType ({commit}, val) {
    commit('setCourseType', val)
  },
  getConfigBl ({commit}, obj) {
    commit('setConfigBl', obj)
  },
  getToken ({commit}, val) {
    commit('setToken', val)
  },
  getEmptyDataObj ({commit}, val) {
    commit('setEmptyDataObj', val)
  },
  getTestObj ({commit}, val) {
    commit('getTestAbility', val)
  }
}
const mutations = {
  setPlayingLive (state, val) {
    state.playingLive = val
  },
  setPlayingRecord (state, val) {
    state.playingRecord = val
  },
  setCourseType (state, val) {
    state.courseType = val
  },
  setConfigBl (state, val) {
    state.configBl = val
  },
  setToken (state, val) {
    state.token = val
  },
  setEmptyDataObj (state, val) {
    state.emptyDataObj = val
  },
  getTestAbility (state, val) {
    state.testData = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
