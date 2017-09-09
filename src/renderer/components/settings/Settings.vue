<template>
  <div class="settings">
    <router-link to="/">
      <span v-once v-html="backSvg" class="icon"></span>
    </router-link>
    <input type="text" placeholder="client id" :value="settingsState.clientId" @input="updateClientId"></input>
    <input type="text" placeholder="client secret" :value="settingsState.clientSecret" @input="updateClientSecret"></input>
    <button @click="saveSettings">Save</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import backSvg from "open-iconic/svg/chevron-left.svg";
import { UserSettings } from '../../../types';

@Component
export default class Settings extends Vue {
  get settingsState(): UserSettings {
    return this.$store.state.settings;
  }

  get backSvg(): string {
    return backSvg;
  }

  updateClientId(event: Event): void {
    this.$store.commit('setClientId', (event.currentTarget as HTMLTextAreaElement).value);
  }

  updateClientSecret(event: Event): void {
    this.$store.commit('setClientSecret', (event.currentTarget as HTMLTextAreaElement).value);
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
