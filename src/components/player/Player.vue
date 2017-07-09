<template>
  <div v-if="status === 'success'" class="player">
    <search></search>
    <now-playing></now-playing>
    <controls></controls>
    <router-link to="/settings">Placeholder link to settings</router-link>
  </div>
  <div v-else-if="status === 'not_running'">
    <h1>Spotify isn't running! Start Spotify and try again.</h1>
  </div>
  <div v-else>
    <h1>Something went wrong :(. Try restarting Spotify Mini.</h1>
  </div>
</template>

<script>
import Search from "./search";
import NowPlaying from "./NowPlaying";
import Controls from "./Controls";

export default {
  name: "player",
  components: {
    Search,
    NowPlaying,
    Controls
  },
  computed: {
    status() {
      return this.$store.state.app.status;
    }
  }
};
</script>
