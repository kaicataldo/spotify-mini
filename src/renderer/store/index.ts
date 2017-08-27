import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import plugins from './plugins';
import { AppState } from '../../types';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins
}) as Store<AppState>;
