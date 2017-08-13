<template>
  <div class="settings">
    <router-link to="/">
      <span v-once v-html="backSvg" class="icon"></span>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import backSvg from "open-iconic/svg/chevron-left.svg";

@Component
export default class Settings extends Vue {
  get backSvg() {
    return backSvg;
  }
}
</script>

<style scoped>
.icon {
  fill: #fff;
}
</style>
