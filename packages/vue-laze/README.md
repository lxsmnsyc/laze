# vue-laze

> Lazily render components in Vue 3

[![NPM](https://img.shields.io/npm/v/vue-laze.svg)](https://www.npmjs.com/package/vue-laze) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

## Install

```bash
npm install --save vue-laze
```

```bash
yarn add vue-laze
```

## Usage

```vue
<template>
  <h1 ref="container" :class="{ visible: visible }">
    Item is now visible!
  </h1>
</template>
<script lang="ts">
  import { toRefs } from 'vue';
  import useLaze from 'vue-laze';

  export default {
    name: 'Lazy',
    setup(props) {
      const { ref: container, visible } = useLaze<HTMLDivElement>();

      return {
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
```

## Introduction

`vue-laze` defers rendering of components until they are visible in the viewport. This helps our pages to prioritize rendering the components that are critical (and already are visible) than those that are offscreen and has no impact towards the user until visible. The behavior is similar to that of idle-until-urgent pattern but the "idleness" is determined by the user's demand.

`vue-laze` is useful for on-screen transitions, lazy-loading media sources, client-only components, etc..

### SSR

There are different strategies `vue-laze` may help in server-side rendering.

For instance, you can [lazify](https://web.dev/browser-level-image-lazy-loading/#how-do-i-handle-browsers-that-don't-yet-support-lazy-loading) images such that the `"src"` property is pre-rendered through `"data-src"` then reverted back after the image becomes visible.

You can also force a certain element into a client-side-only render given that `useLaze`'s `visible` property only becomes `true` on a client-side context and never on server-side.

## API

### `useLaze<HTMLElement>(): { ref, visible }`

a Vue 3 Composition function that observes an element and provides a visibility state.

#### `ref: Ref<HTMLElement>`

A Vue ref object that captures the element to observe with. The `ref` isn't a plain Vue ref object but rather has "reactive" `current` property: when assigned, `ref` prompts a re-render for the component that owns it. This allows `useLaze` to re-evaluate everytime the observed element is attempted to be changed during the component's lifecycle (Example of this scenario includes force-remounting an element).

#### `visible: boolean`

A boolean value that represents the state of which the element is "visible" or not in the viewport. This value only updates once after the element becomes visible, and only resets back to `false` if the observed element changes (assuming that the mounting element is offscreen).

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
