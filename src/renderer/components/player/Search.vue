<template>
  <div class="searchbar">
    <input type="text" placeholder="Search" v-model="searchParams" @keyup.enter="search"></input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Search extends Vue {
  searchParams: string = '';

  search() {
    this.$store.dispatch('search', this.searchParams)
  }
}
</script>

<style scoped>
.searchbar {
  -webkit-app-region: no-drag;
}
</style>
