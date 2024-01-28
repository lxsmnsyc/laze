import { useDebugValue } from 'react';
import { useLazyRef } from './useLazyRef';

export function useConstant<T>(supplier: () => T): T {
  const { current } = useLazyRef(supplier);
  useDebugValue(current);
  return current;
}
