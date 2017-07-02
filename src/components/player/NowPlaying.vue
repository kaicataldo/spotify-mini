<template>
  <div>
    <h1>Now Playing:</h1>
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
    }
  }
};
</script>
