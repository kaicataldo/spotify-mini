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
  components: {
    SearchResultsList
  }
})
export default class Search extends Vue {
  searchParams: string = '';

  get hasSearchResults(): boolean {
    return !!this.$store.state.searchResults;
  }

  get searchResults(): SearchResults {
    return this.$store.state.searchResults;
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
