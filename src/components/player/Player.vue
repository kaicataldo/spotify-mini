<template>
  <div v-if="status === 'success'" class="player">
    <search></search>
    <now-playing></now-playing>
    <controls></controls>
    <router-link to="/settings">Placeholder link to settings</router-link>
  </div>
  <div v-else-if="status === 'not_running'">
    <h1>Spotify isn't running! Please start the application and then click the button below</h1>
    <button @click="reload">I'm ready!</button>
  </div>
  <div v-else>
    <h1>Something went wrong :(. Try restarting the application or clicking the button below to try again.</h1>
    <button @click="reload">Reload</button>
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
  },
  methods: {
    reload() {
      this.$store.dispatch("getState");
    }
  }
};
</script>
