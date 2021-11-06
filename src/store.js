import Vue from 'vue';
import Vuex from 'vuex';
import states from './store/states'
import actions from './store/actions'
import getters from './store/getters'
import mutetors from './store/mutators'

Vue.use(Vuex);

export default new Vuex.Store({
  state: states,
  getters: getters,
  mutations: mutetors,
  actions: actions,
});
