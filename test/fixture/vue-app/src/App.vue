<template>
  <div id="app">
    <button @click="throwForVue" data-testid="for-vue">for vue</button>
    <button @click="throwForUnhandledrejection" data-testid="for-unhandledrejection">for unhandledrejection</button>
    <button @click="throwForError" data-testid="for-error">for error</button>
    <div data-testid="error">{{ $error.value }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  methods: {
    throwForVue() {
      return Promise.reject("occurred vue error");
    },
    throwForUnhandledrejection() {
      Promise.reject("occurred unhandledrejection");
    },
    throwForError() {
      setTimeout(() => {
        throw "occurred error"
      }, 0);
    }
  }
});
</script>
