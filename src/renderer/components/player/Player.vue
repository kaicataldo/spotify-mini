<template>
  <div v-if="status === 'running'" class="player">
    <search></search>
    <now-playing></now-playing>
    <controls></controls>
    <router-link to="/settings">
      <span v-once v-html="cogSvg" class="icon"></span>
    </router-link>
  </div>
  <div v-else-if="status === 'not_running'">
    <h1>Spotify isn't running! Start Spotify and try again.</h1>
  </div>
  <div v-else>
    <h1>Something went wrong :(. Try restarting Spotify Mini.</h1>
  </div>
</template>

<script lang="ts">
import Search from "./Search.vue";
import NowPlaying from "./NowPlaying.vue";
import Controls from "./Controls.vue";
import cogSvg from "open-iconic/svg/cog.svg";

export default {
  name: "player",
  components: {
    Search,
    NowPlaying,
    Controls
  },
  computed: {
    status() {
      return this.$store.state.player.status;
    },
    cogSvg() {
      return cogSvg;
    }
  }
};
</script>

<style scoped>
.icon {
  fill: #fff;
}
</style>
