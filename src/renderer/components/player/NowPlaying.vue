<template>
  <div>
    <img class="album-artwork" :src="albumArtworkSrc" />
    <p>Artist: {{ artist }}</p>
    <p>Album: {{ album }}</p>
    <p>Track: {{ track }}</p>
  </div>
</template>

<script>
export default {
  name: "now-playing",
  computed: {
    artist() {
      return this.$store.state.player.artist_name;
    },
    album() {
      return this.$store.state.player.album_name;
    },
    track() {
      return this.$store.state.player.track_name;
    },
    albumArtworkSrc() {
      return this.$store.state.player.artwork_url;
    }
  }
};
</script>

<style scoped>
.album-artwork {
  width: 100%;
}
</style>
