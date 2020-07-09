<template>
  <div id="app">
    <button @click="errorForVue" data-testid="for-vue">for vue</button>
    <button @click="errorForUnhandledrejection" data-testid="for-unhandledrejection">for unhandledrejection</button>
    <div data-testid="error">{{ $error.value }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  methods: {
    async errorForVue() {
      return Promise.reject("errorForVue");
    },
    errorForUnhandledrejection() {
      setTimeout(() => {
        Promise.reject("errorForUnhandledrejection")
      }, 0);
    }
  }
});
</script>
