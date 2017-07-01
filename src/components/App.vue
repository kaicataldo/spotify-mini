<template>
  <div id="app">
    <search></search>
    <now-playing></now-playing>
    <controls></controls>
  </div>
</template>

<script>
import Search from "./search";
import NowPlaying from "./NowPlaying";
import Controls from "./Controls";

export default {
  name: "app",
  components: {
    Search,
    NowPlaying,
    Controls
  }
};
</script>
