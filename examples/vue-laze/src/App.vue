<template>
  <div>
    <div className="reset-container">
      <button
        type="button"
        className="reset"
        @click="onClick"
      >
        Remount!
      </button>
    </div>
    <div :key="remount">
      <template v-for="index in 1000" :key="index">
        <Lazy :value="index" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
  import { ref } from 'vue';
  import Lazy from './Lazy.vue';

  export default {
    name: 'App',
    setup() {
      const remount = ref('A');

      function onClick() {
        remount.value = remount.value === 'A' ? 'B' : 'A';
      }

      return {
        remount,
        onClick,
      };
    },
    components: {
      Lazy,
    },
  };
</script>
<style>
  body {
    margin: 0;
    padding: 0;
  }

  * {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .reset-container {
    position: fixed;

    top: 0px;
    right: 0px;

    z-index: 50;
  }

  .reset {
    position: relative;

    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;

    background: linear-gradient(75deg, #2563EB, #0284C7);
    color: white;
    border: none;
    outline: none;

    cursor: pointer;

    transition: background 200ms, transform 200ms;
  }

  .reset:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: inherit;
    top: 0.5rem;
    filter: blur(0.4rem);
    opacity: 0.7;
    z-index: -1;
    left: 0px;
  }

  .reset:hover {
    background: linear-gradient(75deg, #3B82F6, #0EA5E9);
    background-color: #0e0f0f;
    transform: scale(1.1);
  }

  .reset:active {
    background: linear-gradient(75deg, #60A5FA, #38BDF8);
    transform: scale(1.0);
  }
</style>