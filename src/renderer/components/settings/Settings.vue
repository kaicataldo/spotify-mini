<template>
  <div class="settings">
    <router-link to="/">
      <span v-once v-html="backSvg" class="icon"></span>
    </router-link>
    <input type="text" placeholder="client id" :value="clientId" @input="updateClientId"></input>
    <input type="text" placeholder="client secret" :value="clientSecret" @input="updateClientSecret"></input>
    <button @click="saveSettings">Save</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import backSvg from "open-iconic/svg/chevron-left.svg";

@Component
export default class Settings extends Vue {
  get clientId() {
    return this.$store.state.settings.clientId;
  }

  get clientSecret() {
    return this.$store.state.settings.clientSecret;
  }

  get backSvg() {
    return backSvg;
  }

  updateClientId(event: Event) {
    this.$store.commit('setClientId', (<HTMLTextAreaElement>event.currentTarget).value);
  }

  updateClientSecret(event: Event) {
    this.$store.commit('setClientSecret', (<HTMLTextAreaElement>event.currentTarget).value);
  }

  saveSettings() {
    this.$store.dispatch('updateSettings');
  }
}
</script>

<style scoped>
.icon {
  fill: #fff;
}
</style>
