import type { MutableRef } from 'preact/hooks';
import { useDebugValue, useRef } from 'preact/hooks';

export function useLazyRef<T>(supplier: () => T): MutableRef<T> {
  const ref = useRef<MutableRef<T> | null>();

  if (!ref.current) {
    ref.current = {
      current: supplier(),
    };
  }

  useDebugValue(ref.current);

  return ref.current;
}
