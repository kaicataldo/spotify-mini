<template>
  <div>
    <button @click="triggerPrev">Previous</button>
    <button @click="triggerTogglePlay">Play</button>
    <button @click="triggerNext">Next</button>
  </div>
</template>

<script>
import electron from 'electron';
const { ipcRenderer } = electron;

ipcRenderer.on('command response', (event, args) => console.log(args));
ipcRenderer.on('player state', (event, args) => console.log(args));

export default {
  name: 'controls',
  methods: {
    triggerPrev() {
      ipcRenderer.send('command', 'prev');
    },
    triggerTogglePlay() {
      ipcRenderer.send('command', 'togglePlay');
    },
    triggerNext() {
      ipcRenderer.send('command', 'next');
    }
  }
};
</script>
