import type { MutableRefObject } from 'react';
import { useDebugValue, useState } from 'react';
import { useConstant } from './useConstant';
import { useLazyRef } from './useLazyRef';

export default function useReactiveRef<T>(
  supplier: () => T,
): MutableRefObject<T> {
  const [state, setState] = useState<T>(supplier);

  const ref = useLazyRef<T>(supplier);

  if (ref.current !== state) {
    ref.current = state;
  }

  const proxyObject = useConstant(() => ({
    get current() {
      return ref.current;
    },
    set current(value) {
      setState(() => value);
    },
  }));

  useDebugValue(proxyObject);

  return proxyObject;
}
