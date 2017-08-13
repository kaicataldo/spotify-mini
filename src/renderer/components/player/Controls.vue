<template>
  <div class="buttons">
    <span @click="triggerPrev" v-once v-html="prevSvg" class="icon"></span>
    <span @click="triggerTogglePlay" v-if="isPlaying" v-once v-html="pauseSvg" class="icon"></span>
    <span @click="triggerTogglePlay" v-else v-once v-html="playSvg" class="icon"></span>
    <span @click="triggerNext" v-once v-html="nextSvg" class="icon"></span>
  </div>
</template>

<script lang="ts">
import playSvg from "open-iconic/svg/media-play.svg";
import pauseSvg from "open-iconic/svg/media-pause.svg";
import prevSvg from "open-iconic/svg/media-step-backward.svg";
import nextSvg from "open-iconic/svg/media-step-forward.svg";

export default {
  name: "controls",
  computed: {
    isPlaying() {
      return this.$store.state.player.player_state === "playing";
    },
    playSvg() {
      return playSvg;
    },
    pauseSvg() {
      return pauseSvg;
    },
    prevSvg() {
      return prevSvg;
    },
    nextSvg() {
      return nextSvg;
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
.icon {
  fill: #a0a0a0;
}
</style>
