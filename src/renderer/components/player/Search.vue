<template>
  <div class="searchbar">
    <input type="text" placeholder="Search" v-model="searchParams" @keyup.enter="search"></input>
    <search-results-list v-if="hasSearchResults" :search-results="searchResults"></search-results-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SearchResultsList from './SearchResultsList.vue'
import { SearchResults } from '../../../types';

@Component({
  props: {
    searchResults: {}
  },
  components: {
    SearchResultsList
  }
})
export default class Search extends Vue {
  searchresults: SearchResults;

  searchParams: string = '';

  get hasSearchResults(): boolean {
    return !!this.$props.searchResults;
  }

  search(): void {
    this.$store.dispatch('search', this.searchParams)
  }
}
</script>

<style scoped>
.searchbar {
  -webkit-app-region: no-drag;
}
</style>
