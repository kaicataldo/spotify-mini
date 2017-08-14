<template>
  <div class="searchbar">
    <input type="text"></input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Search extends Vue {}
</script>

<style scoped>
.searchbar {
  -webkit-app-region: no-drag;
}
</style>
