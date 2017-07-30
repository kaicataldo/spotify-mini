import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as plugins from "./plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasLoaded: false,
    player: {
      player_state: "",
      track_name: "",
      track_id: "",
      artist_name: "",
      album_name: "",
      artwork_url: "",
      track_url: "",
      status: "",
      message: ""
    }
  },
  plugins: [plugins.setState],
  actions,
  mutations
});
