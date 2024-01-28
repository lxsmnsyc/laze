import type { MutableRefObject } from 'react';
import { useDebugValue, useRef } from 'react';

export function useLazyRef<T>(supplier: () => T): MutableRefObject<T> {
  const ref = useRef<MutableRefObject<T> | null>();

  if (!ref.current) {
    ref.current = {
      current: supplier(),
    };
  }

  useDebugValue(ref.current);

  return ref.current;
}
