<template>
  <div id="app">
    <div v-if="hasLoaded">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    hasLoaded() {
      return this.$store.state.hasLoaded;
    }
  }
}
</script>

<style>
body {
  color: #fff;
  background-color: #181818;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 200;
  text-align: center;
  -webkit-app-region: drag;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
    display: none;
}
</style>
