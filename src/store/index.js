import Vue from "vue";
import Vuex from "vuex";
import electron from "electron";
const { ipcRenderer } = electron;
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hasLoaded: false,
    app: {
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
  actions,
  mutations
});

ipcRenderer.on("setState", (event, state) => store.commit("setState", state));

export default store;