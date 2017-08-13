import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

new Vue({
  el: '#app',
  template: '<app></app>',
  components: { App },
  router,
  store,
  mounted() {
    this.$store.dispatch('getPlayerState');
  }
});
