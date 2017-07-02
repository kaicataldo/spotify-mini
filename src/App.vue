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
