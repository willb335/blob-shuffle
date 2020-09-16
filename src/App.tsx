import React, { SyntheticEvent, useEffect, useState } from 'react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    };

    setBlobs((prev) => {
      return [...prev, currentBlob];
    });
    setRecentBlob(currentBlob);
  }

  function splitBlob(index: number): void {
    console.log('splitting', index);
    const newBlobs = blobs;
    const seed = Math.random();
    const size = newBlobs[index].size / 2;
    const generation = newBlobs[index].generation + 1;
    const splitCount = Math.pow(generation === 1 ? 2 : generation, 2);
    const path = blob.svgPath({
      seed,
      extraPoints: 8,
      randomness: 4,
      size,
    });

    newBlobs[index] = {
      ...newBlobs[index],
      ...{
        children: Array.from(Array(4)).map((_, i) => ({
          generation,
          size,
          path,
          id: `${i}-${generation}`,
          fill: 'orange',
          children: undefined,
          index: i,
        })),
      },
    };

    console.log('newBlobs', newBlobs);

    setBlobs(newBlobs);
    setRecentBlob(newBlobs[index]);
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
          console.log('updating', i);
          return (
            <BlobContainer key={blob.id} size={blob.size}>
              <Blob {...blob} split={splitBlob} index={i} />
            </BlobContainer>
          );
        })}
      </Container>
    </>
  );
}

export default App;
