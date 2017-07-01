<template>
  <div id="player">
    <search></search>
    <now-playing></now-playing>
    <controls></controls>
    <router-link to="/settings">Placeholder link to settings</router-link>
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
  }
};
</script>
