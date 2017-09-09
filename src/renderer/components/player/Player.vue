<template>
  <div v-if="playerState.status === 'running'" class="player">
    <search :searchResults="searchResults"></search>
    <now-playing :playerState="playerState"></now-playing>
    <controls :isPlaying="isPlaying"></controls>
    <router-link to="/settings">
      <span v-once v-html="cogSvg" class="icon"></span>
    </router-link>
  </div>
  <div v-else-if="playerState.status === 'not_running'">
    <h1>Spotify isn't running! Start Spotify and try again.</h1>
  </div>
  <div v-else>
    <h1>Something went wrong :(. Try restarting Spotify Mini.</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Search from "./Search.vue";
import NowPlaying from "./NowPlaying.vue";
import Controls from "./Controls.vue";
import cogSvg from "open-iconic/svg/cog.svg";
import { SearchResults, PlayerState } from '../../../types';

@Component({
  components: {
    Search,
    NowPlaying,
    Controls
  }
})
export default class Player extends Vue {
  get playerState(): PlayerState {
    return this.$store.state.player;
  }

  get searchResults(): SearchResults {
    return this.$store.state.searchResults;
  }

  get isPlaying(): boolean {
    return this.$store.getters.isPlaying;
  }

  get cogSvg(): string {
    return cogSvg;
  }
}
</script>

<style scoped>
.icon {
  fill: #fff;
}
</style>
