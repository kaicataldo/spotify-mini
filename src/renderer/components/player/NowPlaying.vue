<template>
  <div>
    <img class="album-artwork" :src="albumArtworkSrc" />
    <p>Artist: {{ artist }}</p>
    <p>Album: {{ album }}</p>
    <p>Track: {{ track }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class NowPlaying extends Vue {
  get artist(): string {
    return this.$store.state.player.artist_name;
  }

  get album(): string {
    return this.$store.state.player.album_name;
  }

  get track(): string {
    return this.$store.state.player.track_name;
  }

  get albumArtworkSrc(): string {
    return this.$store.state.player.artwork_url;
  }
}
</script>

<style scoped>
.album-artwork {
  width: 100%;
}
</style>
