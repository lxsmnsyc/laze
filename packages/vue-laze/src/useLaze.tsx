import type { Ref, UnwrapRef } from 'vue';
import { readonly, ref, watchEffect } from 'vue';

export interface Laze<T extends HTMLElement> {
  ref: Ref<UnwrapRef<T> | null>;
  visible: Ref<boolean>;
}

export interface LazeOptions {
  refresh?: boolean | Ref<boolean>;
}

export default function useLaze<T extends HTMLElement>(
  options?: LazeOptions,
): Laze<T> {
  const visible = ref(false);

  // We use a reactive ref here so that the component
  // re-renders if the host element changes, therefore
  // re-evaluating our intersection logic
  const container = ref<T | null>(null);

  watchEffect(onCleanup => {
    // If the host changed, make sure that
    // visibility is set to false
    visible.value = false;

    let refresh = false;

    if (options && options.refresh) {
      refresh =
        typeof options.refresh === 'boolean'
          ? options.refresh
          : options.refresh.value;
    }

    if (container.value) {
      const current = container.value;

      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (refresh) {
            visible.value = entry.isIntersecting;
          } else if (entry.isIntersecting) {
            // Host intersected, set visibility to true
            visible.value = true;

            // Stop observing
            observer.disconnect();
          }
        }
      });

      observer.observe(current);

      onCleanup(() => {
        observer.unobserve(current);
        observer.disconnect();
      });
    }
  });

  return {
    ref: container,
    visible: readonly(visible),
  };
}
