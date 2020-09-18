import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash.shuffle';
import styled from 'styled-components';

import { useMeasure } from './useMeasure';
import { useMedia } from './useMedia';
import { images, createBlobs, BlobData } from './data';
import { Blob } from './Blob';

type XY = [number, number];

const List = styled.div`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
  width: 100%;
  height: 100%;

  & > div {
    position: absolute;
    will-change: transform, width, height, opacity;
    padding: 15px;
    /* border: 2px solid blue; */
  }

  & div > div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 10px;
    line-height: 10px;
    border-radius: 4px;
    box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
  }
`;

export function Shuffle() {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );
  // Hook2: Measure the width of the container element
  const [bind, bounds] = useMeasure();
  // Hook3: Hold items
  const [items, setItems] = useState(createBlobs(columns));
  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    void setInterval(() => setItems(shuffle), 6000);
  }, []);
  // Form a grid of stacked items using width & columns we got from hooks 1 & 2
  let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
  let gridItems = items.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy: XY = [
      (bounds.width / columns) * column,
      (heights[column] += child.height / 2 + 30) - child.height / 2,
    ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return {
      ...child,
      xy,
      width: bounds.width / columns,
      height: child.height / 2,
    };
  });
  // Hook5: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, (item: BlobData) => item.path, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });
  // Render the grid
  return (
    <List {...bind} style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, height, width }, key }: any) => {
        return (
          <animated.div
            key={key}
            style={{
              transform: xy.interpolate(
                (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
              ),
              height: height + 30,
              width,
            }}
          >
            <div>
              <Blob fill={item.fill} size={item.height} path={item.path} />
            </div>
          </animated.div>
        );
      })}
    </List>
  );
}
