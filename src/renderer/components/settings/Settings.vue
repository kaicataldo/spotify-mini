<template>
  <div class="settings">
    <router-link to="/">
      <span v-once v-html="backSvg" class="icon"></span>
    </router-link>
  </div>
</template>

<script lang="ts">
import backSvg from "open-iconic/svg/chevron-left.svg";

export default {
  name: "settings",
  computed: {
    backSvg() {
      return backSvg;
    }
  }
};
</script>

<style scoped>
.icon {
  fill: #fff;
}
</style>
