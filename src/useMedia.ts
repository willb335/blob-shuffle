import { useEffect, useState } from 'react';

export function useMedia(
  queries: string[],
  values: number[],
  defaultValue: number
): number {
  const match = (): number =>
    values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
  const [value, setValue] = useState(match);
  useEffect(() => {
    const handler = () => setValue(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}
