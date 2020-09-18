import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash.shuffle';
import styled from 'styled-components';

import { useMeasure } from './useMeasure';
import { useMedia } from './useMedia';
import { images } from './data';

type XY = [number, number];

export function App() {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );
  // Hook2: Measure the width of the container element
  const [bind, bounds] = useMeasure();
  // Hook3: Hold items
  const [items, setItems] = useState(images);
  // Hook4: shuffle data every 2 seconds
  useEffect(() => void setInterval(() => setItems(shuffle), 2000), []);
  // Form a grid of stacked items using width & columns we got from hooks 1 & 2
  let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
  let gridItems = items.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy: XY = [
      (bounds.width / columns) * column,
      (heights[column] += child.height / 2) - child.height / 2,
    ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return {
      ...child,
      xy,
      width: bounds.width / columns,
      height: child.height / 2,
    };
  });
  // Hook5: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, (item: any) => item.css, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  // Render the grid
  return (
    <div {...bind} className="list" style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, ...rest }, key }: any) => (
        <animated.div
          key={key}
          style={{
            transform: xy.interpolate(
              (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
            ),
            ...rest,
          }}
        >
          <div style={{ backgroundImage: item.css }} />
        </animated.div>
      ))}
    </div>
  );
}
