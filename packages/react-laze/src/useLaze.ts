import type { MutableRefObject } from 'react';
import { useDebugValue, useEffect, useState } from 'react';
import useReactiveRef from './useReactiveRef';

export interface Laze<T extends HTMLElement> {
  ref: MutableRefObject<T | null>;
  visible: boolean;
}

export interface LazeOptions {
  refresh?: boolean;
}

export default function useLaze<T extends HTMLElement>(
  options?: LazeOptions,
): Laze<T> {
  const [visible, setVisible] = useState(false);

  // We use a reactive ref here so that the component
  // re-renders if the host element changes, therefore
  // re-evaluating our intersection logic
  const ref = useReactiveRef<T | null>(() => null);

  // We need to destructure here since
  // the host element is our dependency,
  // and we need to track whenever it changes.
  const { current } = ref;

  const shouldRefresh = options?.refresh;

  useEffect(() => {
    // If the host changed, make sure that
    // visibility is set to false
    setVisible(false);

    if (current) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (shouldRefresh) {
            setVisible(entry.isIntersecting);
          } else if (entry.isIntersecting) {
            // Host intersected, set visibility to true
            setVisible(true);

            // Stop observing
            observer.disconnect();
          }
        }
      });

      observer.observe(current);

      return () => {
        observer.unobserve(current);
        observer.disconnect();
      };
    }

    return undefined;
  }, [current, shouldRefresh]);

  const value = {
    ref,
    visible,
  };

  useDebugValue(value);

  return value;
}
