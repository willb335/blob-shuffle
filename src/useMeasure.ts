import { useRef, useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function useMeasure(): [
  { ref: React.MutableRefObject<HTMLDivElement> },
  Bounds
] {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [bounds, setBounds] = useState<Bounds>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  );
  useEffect(() => {
    ro.observe(ref.current);
    return ro.disconnect;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [{ ref }, bounds];
}
