import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

new Vue({
  el: "#app",
  template: "<app></app>",
  components: { App },
  router,
  store,
  mounted() {
    this.$store.dispatch("getPlayerState");
  }
});
