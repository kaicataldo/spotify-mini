import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasLoaded: false,
    player: {
      player_state: '',
      track_name: '',
      track_id: '',
      artist_name: '',
      album_name: '',
      artwork_url: '',
      track_url: '',
      status: '',
      message: ''
    }
  },
  plugins: [plugins.setState],
  actions,
  mutations
});
