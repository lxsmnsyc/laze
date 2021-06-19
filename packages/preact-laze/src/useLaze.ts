import { useReactiveRef } from '@lyonph/preact-hooks';
import {
  Ref,
  useDebugValue,
  useEffect,
  useState,
} from 'preact/hooks';

export interface Laze<T extends HTMLElement> {
  ref: Ref<T | null>;
  visible: boolean;
}

export default function useLaze<T extends HTMLElement>(): Laze<T> {
  const [visible, setVisible] = useState(false);

  // We use a reactive ref here so that the component
  // re-renders if the host element changes, therefore
  // re-evaluating our intersection logic
  const ref = useReactiveRef<T | null>(() => null);

  // We need to destructure here since
  // the host element is our dependency,
  // and we need to track whenever it changes.
  const { current } = ref;

  useEffect(() => {
    // If the host changed, make sure that
    // visibility is set to false
    setVisible(false);

    if (current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === current && entry.isIntersecting) {
            // Host intersected, set visibility to true
            setVisible(true);

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
  }, [current]);

  const value = {
    ref,
    visible,
  };

  useDebugValue(value);

  return value;
}
