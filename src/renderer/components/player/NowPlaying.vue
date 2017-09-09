<template>
  <div>
    <img class="album-artwork" :src="playerState.artwork_url" />
    <p>Artist: {{ playerState.artist_name }}</p>
    <p>Album: {{ playerState.album_name }}</p>
    <p>Track: {{ playerState.track_name }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { PlayerState } from '../../../types';

@Component({
  props: {
    playerState: {}
  }
})
export default class NowPlaying extends Vue {
  playerState: PlayerState;
}
</script>

<style scoped>
.album-artwork {
  width: 100%;
}
</style>
