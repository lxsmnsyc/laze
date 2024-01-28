import { useDebugValue } from 'preact/hooks';
import { useLazyRef } from './useLazyRef';

export function useConstant<T>(supplier: () => T): T {
  const { current } = useLazyRef(supplier);
  useDebugValue(current);
  return current;
}
