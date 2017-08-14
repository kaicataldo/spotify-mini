import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state, { AppState } from './state';
import actions from './actions';
import mutations from './mutations';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  plugins: [plugins.setState],
  actions,
  mutations
}) as Store<AppState>;
