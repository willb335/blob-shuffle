import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as blob from 'blobs/v2';

import { Blob, BlobProps } from './Blob';
import logo from './react.svg';

export const BlobContainer = styled.div<{ size: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  border-radius: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  flex-wrap: wrap;
  outline: 2px solid blue;
`;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(128);
  const [recentBlob, setRecentBlob] = useState<BlobProps | undefined>(
    undefined
  );

  useEffect(() => {
    createBlob(0);
  }, []);

  function createBlob(index: number): void {
    const seed = Math.random();
    const generation = 1;
    const path = blob.svgPath({
      seed,
      extraPoints: 8,
      randomness: 4,
      size,
    });

    const currentBlob = {
      size,
      path,
      id: `${index}-${generation}`,
      fill: index === 0 ? 'red' : getRandomColor(),
      generation: 1,
      children: undefined,
      index,
    };

    setBlobs((prev) => {
      return [...prev, currentBlob];
    });
    setRecentBlob(currentBlob);
    setCount((prev) => prev + 1);
  }

  function splitBlob(i: number): void {
    let newBlobs = blobs;
    let generation = newBlobs[i].generation + 1;
    let size = newBlobs[i].size / generation;
    let splitCount = Math.pow(generation, 2);

    const createChildren = (index: number): BlobProps[] => {
      return Array.from(Array(splitCount)).map((_, i) => {
        const seed = Math.random();

        const path = blob.svgPath({
          seed,
          extraPoints: 8,
          randomness: 4,
          size,
        });

        return {
          generation,
          size,
          path,
          id: `${i}-${generation}`,
          fill: getRandomColor(),
          children: undefined,
          index,
        };
      });
    };

    newBlobs[i] = {
      ...newBlobs[i],
      ...{
        generation,
        children: createChildren(i),
      },
    };

    setBlobs(newBlobs);
    setSize(size);
    setRecentBlob(newBlobs[i]);
    setCount(
      (prev) => prev + (Math.pow(generation, 2) - Math.pow(generation - 1, 2))
    );
  }

  useEffect(() => {
    console.log(size);
  }, [size]);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <div>Count: {count}</div>
      <button onClick={() => createBlob(blobs.length)}>Click Me</button>
      <BlobContainer size={128}>
        {recentBlob && <Blob {...recentBlob} />}
      </BlobContainer>
      <Container>
        {/* {Array.from(Array(1000)).map((_, i) => {
          return (
            <BlobContainer
              key={i.toString()}
              size={32}
              onClick={() => createBlob(i)}
            >
              <Blob {...blobs[i]} index={i} />
            </BlobContainer>
          );
        })} */}
        {blobs.map((blob, i) => {
          return (
            <BlobContainer
              key={blob.id}
              tabIndex={0}
              size={128}
              onClick={() => i !== 0 && splitBlob(i)}
              onKeyPress={(e) => {
                console.log('e.key', e.target);

                if (e.key === ' ') {
                  console.log('e.key', e.key);
                  splitBlob(i);
                }

                if (e.key === 'Enter') {
                  console.log('e.key', e.key);
                  createBlob(blobs.length);
                }
              }}
            >
              <Blob {...blob} index={i} />
            </BlobContainer>
          );
        })}
      </Container>
    </>
  );
}

export default App;
