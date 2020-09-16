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
  const [answer, setAnswer] = useState(10000);
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
  const [blobCount, setBlobCount] = useState(0);
  // const [blobSize, setBlobSize] = useState(32);
  // const [containerTotal, setContainerTotal] = useState(2);

  useEffect(() => {
    createBlob(blobCount);
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

    setBlobs((prev) => {
      return [
        ...prev,
        {
          size,
          path,
          id: `${index}-${generation}`,
          fill: 'green',
          generation: 1,
          children: undefined,
          index,
        },
      ];
    });
    setBlobCount((prev) => prev + 1);
  }

  function splitBlob(index: number): void {
    console.log('count', index);
    const newBlobs = blobs;
    const seed = Math.random();
    const size = newBlobs[index].size / 2;
    const generation = newBlobs[index].generation + 1;
    const path = blob.svgPath({
      seed,
      extraPoints: 8,
      randomness: 4,
      size,
    });

    newBlobs[index] = {
      ...newBlobs[index],
      ...{
        children: [
          {
            generation,
            size,
            path,
            id: `${0}-${generation}`,
            fill: 'orange',
            children: undefined,
            index,
          },
          {
            generation,
            size,
            path,
            id: `${1}-${generation}`,
            fill: 'red',
            children: undefined,
            index,
          },
        ],
      },
    };

    setBlobs(newBlobs);

    setBlobCount((prev) => prev + 3);

    console.log('blobs', blobs);
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => createBlob(blobCount)}>Click Me</button>
      <Container>
        {blobs.map((blob, i) => (
          <BlobContainer key={blob.id} size={blob.size}>
            <Blob {...blob} split={splitBlob} index={i} />
          </BlobContainer>
        ))}
      </Container>
    </>
  );
}

export default App;
