import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash.shuffle';
import styled from 'styled-components';

import { useMeasure } from './useMeasure';
import { useMedia } from './useMedia';
import { createBlobs, BlobData } from './data';
import { Blob } from './Blob';

type XY = [number, number];

interface Item {
  key: string;
  path: string;
  height: number;
  width: number;
  fill: string;
  xy: XY;
}

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
  }
`;

const Card = styled.div<{
  isCurrentItem: boolean;
  fill: string;
}>`
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
  border-radius: 100%;
  box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
  outline: ${(props) =>
    props.isCurrentItem ? `2px solid ${props.fill}` : 'none'};
  background-color: black;
`;

export function Shuffle() {
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [match, setMatch] = useState<Item[]>([]);
  const [level, setLevel] = useState(1);

  // Tie media queries to the number of columns
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [8, 6, 4],
    2
  );
  const [items, setItems] = useState(createBlobs(columns, 20));
  // Measure the width of the container element
  const [bind, bounds] = useMeasure();
  useEffect(() => {
    void setInterval(() => setItems(shuffle), 2000);
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      setItems(createBlobs(columns, 10));
      setLevel((prev) => prev + 1);
    }
  }, [columns, items]);

  // Form a grid of stacked items
  let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
  let gridItems: Item[] = items.map((child, i) => {
    const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy: XY = [
      (bounds.width / columns) * column,
      (heights[column] += child.height / 2 + (i < columns ? 0 : 30)) -
        child.height / 2,
    ]; // X = container width / number of columns * column index, Y = it's just the height of the current column
    return {
      ...child,
      xy,
      width: bounds.width / columns,
      height: child.height / 2,
    };
  });
  // Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, (item: BlobData) => item.key, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  function handleItemClick(item: Item): void {
    if (item.path === currentItem?.path && item.key !== currentItem.key) {
      setItems((prev) => prev.filter((curItem) => item.path !== curItem.path));
      setMatch([currentItem, item]);
    }
    setCurrentItem(item);
  }
  // Render the grid
  return (
    <List {...bind} style={{ height: Math.max(...heights) }}>
      {transitions.map(({ item, props: { xy, height, width }, key }: any) => {
        console.log('key', key);
        const isMatched: boolean =
          match.filter((m) => m.key === item.key).length > 0;
        return (
          !isMatched && (
            <animated.div
              key={key.toString()}
              style={{
                transform: xy.interpolate(
                  (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
                ),
                height: height + 30,
                width,
              }}
            >
              <Card
                onClick={() => handleItemClick(item)}
                isCurrentItem={item.key === currentItem?.key}
                fill={item.fill}
              >
                <Blob fill={item.fill} size={item.height} path={item.path} />
              </Card>
            </animated.div>
          )
        );
      })}
    </List>
  );
}
