<template>
  <div>
    <h1>Now Playing:</h1>
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
      return this.$store.state.app.artist_name;
    },
    album() {
      return this.$store.state.app.album_name;
    },
    track() {
      return this.$store.state.app.track_name;
    },
    albumArtworkSrc() {
      return this.$store.state.app.artwork_url;
    }
  }
};
</script>

<style scoped>
.album-artwork {
  width: 100%;
}
</style>
