<template>
  <div>
    <div className="reset-container">
      <div className="reset-buttons">
        <button
          type="button"
          className="reset"
          @click="onRemount"
        >
          Remount!
        </button>
        <button
          type="button"
          className="reset"
          @click="onRefresh"
        >
          {{`Refresh: ${refresh ? 'On' : 'Off'}`}}
        </button>
      </div>
    </div>
    <div :key="remount">
      <template v-for="index in 1000" :key="index">
        <Lazy :value="index" />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
  import { provide, ref } from 'vue';
  import Lazy from './Lazy.vue';

  export default {
    name: 'App',
    setup() {
      const remount = ref('A');
      const refresh = ref(false);

      function onRemount() {
        remount.value = remount.value === 'A' ? 'B' : 'A';
      }

      function onRefresh() {
        refresh.value = !refresh.value;
      }

      provide('refresh', refresh);

      return {
        remount,
        refresh,
        onRemount,
        onRefresh,
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
    position: sticky;

    top: 0px;

    width: 100%;
    height: auto;

    z-index: 50;

    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .reset-buttons {
    backdrop-filter: blur(8px);

    margin: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .reset {
    position: relative;

    margin: 0.5rem;

    padding: 0.5rem;
    border-radius: 0.5rem;

    background: linear-gradient(75deg, #2563EB, #0284C7);
    color: white;
    border: none;
    outline: none;

    cursor: pointer;

    transition: background 200ms, transform 200ms;
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