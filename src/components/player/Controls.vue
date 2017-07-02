<template>
  <div class="buttons">
    <button @click="triggerPrev">Previous</button>
    <button @click="triggerTogglePlay">{{ toggleText }}</button>
    <button @click="triggerNext">Next</button>
  </div>
</template>

<script>
export default {
  name: "controls",
  computed: {
    toggleText() {
      return this.$store.state.app.player_state;
    }
  },
  methods: {
    triggerPrev() {
      this.$store.dispatch("prev");
    },
    triggerTogglePlay() {
      this.$store.dispatch("togglePlay");
    },
    triggerNext() {
      this.$store.dispatch("next");
    }
  }
};
</script>

<style scoped>
.buttons {
  -webkit-app-region: no-drag;
}
</style>