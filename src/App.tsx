import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as blob from 'blobs/v2';

import { Blob, BlobProps } from './Blob';
import logo from './react.svg';

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }: { size: number }) => size && `${size}px`};
  height: ${({ size }: { size: number }) => size && `${size}px`};
  /* border: 2px solid red; */
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  border: 2px solid red;
`;

function App() {
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
  const [recentBlob, setRecentBlob] = useState<BlobProps | undefined>(
    undefined
  );

  useEffect(() => {
    createBlob(0);
  }, []);

  function createBlob(index: number): void {
    const seed = Math.random();
    const size = 32;
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
      fill: 'green',
      generation: 1,
      children: undefined,
      index,
      parent: undefined,
    };

    setBlobs((prev) => {
      return [...prev, currentBlob];
    });
    setRecentBlob(currentBlob);
  }

  function splitBlob(i: number): void {
    let newBlobs = blobs;
    let generation = newBlobs[i].generation + 1;
    let size = newBlobs[i].size / generation;
    let splitCount = Math.pow(generation, 2);

    console.log('gen', generation);

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
          fill: 'orange',
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
    setRecentBlob(newBlobs[i]);
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => createBlob(blobs.length)}>Click Me</button>
      <BlobContainer size={32}>
        {recentBlob && <Blob {...recentBlob} />}
      </BlobContainer>
      <Container>
        {blobs.map((blob, i) => {
          return (
            <BlobContainer
              key={blob.id}
              size={blob.size}
              onClick={() => splitBlob(i)}
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
