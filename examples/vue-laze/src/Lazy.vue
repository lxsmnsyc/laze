<template>
  <h1 ref="container" :class="{ visible: visible }">
    Item #{{value}} is now visible!
  </h1>
</template>
<script lang="ts">
  import { inject, Ref, toRefs } from 'vue';
  import useLaze from 'vue-laze';

  export default {
    name: 'Lazy',
    props: {
      value: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const { value } = toRefs(props);

      const refresh: Ref<boolean> = inject('refresh');

      const { ref: container, visible } = useLaze<HTMLDivElement>({
        refresh,
      });

      return {
        value,
        container,
        visible,
      };
    }
  }
</script>
<style scoped>
  h1 {
    margin: 1rem;

    text-align: center;

    transition: opacity 200ms, transform 200ms;
    opacity: 0;
    transform: scale(0.5);
  }

  h1.visible {
    opacity: 1;
    transform: scale(1);
  }
</style>