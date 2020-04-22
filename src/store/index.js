import Vue from 'vue'
import Vuex from 'vuex'
import subjectData from './moduls/subjectData'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    subjectData
  }
})
