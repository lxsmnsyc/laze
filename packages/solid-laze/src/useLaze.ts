import {
  createEffect,
  createSignal,
  onCleanup,
  untrack,
} from 'solid-js';

export interface Laze<T extends HTMLElement> {
  ref: (value: T) => void;
  visible: boolean;
}

export interface LazeOptions {
  refresh?: boolean;
}

export default function useLaze<T extends HTMLElement>(
  options?: LazeOptions,
): Laze<T> {
  const [visible, setVisible] = createSignal(false);

  // We use a reactive ref here so that the component
  // re-renders if the host element changes, therefore
  // re-evaluating our intersection logic
  const [ref, setRef] = createSignal<T | null>(null);

  createEffect(() => {
    // If the host changed, make sure that
    // visibility is set to false
    setVisible(false);

    const current = ref();
    if (current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === current) {
            if (untrack(() => options?.refresh)) {
              setVisible(entry.isIntersecting);
            } else if (entry.isIntersecting) {
              // Host intersected, set visibility to true
              setVisible(true);

              // Stop observing
              observer.disconnect();
            }
          }
        });
      });

      observer.observe(current);

      onCleanup(() => {
        observer.unobserve(current);
        observer.disconnect();
      });
    }
  });

  return {
    ref(value) {
      return setRef(() => value);
    },
    get visible() {
      return visible();
    },
  };
}
