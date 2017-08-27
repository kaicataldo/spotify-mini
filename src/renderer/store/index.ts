import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import state  from './state';
import actions from './actions';
import mutations from './mutations';
import plugins from './plugins';

import { AppState } from '../../types/AppState';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  plugins: [plugins.setState],
  actions,
  mutations
}) as Store<AppState>;
