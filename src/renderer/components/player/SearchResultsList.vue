<template>
  <div class="search-results-list" @click="confirmed">
    {{ searchResults }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { SearchResults } from '../../../types';

@Component({
  props: {
    searchResults: {}
  }
})
export default class SearchResultsList extends Vue {
  searchResults: SearchResults;

  confirmed() {
    this.$store.commit('clearSearchResults');
  }
}
</script>

<style scoped>
</style>
