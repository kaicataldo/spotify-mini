import Vue from 'vue';
import Router from 'vue-router';
import Player from '../components/player/Player.vue';
import Settings from '../components/settings/Settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Player',
      component: Player
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
});
