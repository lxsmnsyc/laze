# preact-laze

> Lazily render components in Preact

[![NPM](https://img.shields.io/npm/v/preact-laze.svg)](https://www.npmjs.com/package/preact-laze) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/lxsmnsyc/laze/tree/main/examples/preact-laze)

## Install

```bash
npm install --save preact-laze
```

```bash
yarn add preact-laze
```

## Usage

```tsx
import { useLaze } from 'preact-laze';


// ...
const { ref, visible } = useLaze();

return (
  <div ref={ref}>
    {visible
      ? <h1>I am now visible!</h1>
      : <h1>I am hidden!</h1>}
  </div>
);
```

## Introduction

`preact-laze` defers rendering of components until they are visible in the viewport. This helps our pages to prioritize rendering the components that are critical (and already are visible) than those that are offscreen and has no impact towards the user until visible. The behavior is similar to that of idle-until-urgent pattern but the "idleness" is determined by the user's demand.

`preact-laze` is useful for on-screen transitions, lazy-loading media sources, client-only components, etc..

### SSR

There are different strategies `preact-laze` may help in server-side rendering.

For instance, you can [lazify](https://web.dev/browser-level-image-lazy-loading/#how-do-i-handle-browsers-that-don't-yet-support-lazy-loading) images such that the `"src"` property is pre-rendered through `"data-src"` then reverted back after the image becomes visible.

You can also force a certain element into a client-side-only render given that `useLaze`'s `visible` property only becomes `true` on a client-side context and never on server-side.

## API

### `useLaze<HTMLElement>(): { ref, visible }`

a Preact hook that observes an element and provides a visibility state.

#### `ref: Ref<HTMLElement>`

A Preact ref object that captures the element to observe with. The `ref` isn't a plain Preact ref object but rather has "reactive" `current` property: when assigned, `ref` prompts a re-render for the component that owns it. This allows `useLaze` to re-evaluate everytime the observed element is attempted to be changed during the component's lifecycle (Example of this scenario includes force-remounting an element).

#### `visible: boolean`

A boolean value that represents the state of which the element is "visible" or not in the viewport. This value only updates once after the element becomes visible, and only resets back to `false` if the observed element changes (assuming that the mounting element is offscreen).

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
