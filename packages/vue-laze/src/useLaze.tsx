import {
  readonly,
  Ref,
  ref,
  UnwrapRef,
  watchEffect,
} from 'vue';

export interface Laze<T extends HTMLElement> {
  ref: Ref<UnwrapRef<T> | null>;
  visible: Ref<boolean>;
}

export default function useLaze<T extends HTMLElement>(): Laze<T> {
  const visible = ref(false);

  // We use a reactive ref here so that the component
  // re-renders if the host element changes, therefore
  // re-evaluating our intersection logic
  const container = ref<T | null>(null);

  // We need to destructure here since
  // the host element is our dependency,
  // and we need to track whenever it changes.

  watchEffect(() => {
    // If the host changed, make sure that
    // visibility is set to false
    visible.value = false;

    if (container.value) {
      const current = container.value;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === current && entry.isIntersecting) {
            // Host intersected, set visibility to true
            visible.value = true;

            // Stop observing
            observer.disconnect();
          }
        });
      });

      observer.observe(current);

      return () => {
        observer.unobserve(current);
        observer.disconnect();
      };
    }

    return undefined;
  });

  return {
    ref: container,
    visible: readonly(visible),
  }
}
