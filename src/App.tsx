import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as blob from 'blobs/v2';

import { Blob, BlobProps } from './Blobs';
import logo from './react.svg';

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }: { size: number }) => size && `${size}px`};
  height: ${({ size }: { size: number }) => size && `${size}px`};
  border: 2px solid red;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
`;

function App() {
  const [answer, setAnswer] = useState(10000);
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
  const [blobCount, setBlobCount] = useState(0);
  // const [blobSize, setBlobSize] = useState(32);
  // const [containerTotal, setContainerTotal] = useState(2);

  useEffect(() => {
    createBlob(blobCount);
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
          id: index + generation,
          fill: 'green',
          generation: 1,
          children: undefined,
        },
      ];
    });
    setBlobCount((prev) => prev + 1);
  }

  // function splitBlob(e: SyntheticEvent, id: number): void {
  //   console.log('id', id);
  //   const newBlobs = blobs;
  //   newBlobs[id] = {
  //     ...newBlobs[id],
  //     ...{
  //       children: [
  //         {
  //           generation: newBlobs[id].generation + 1,
  //           size: newBlobs[id].size / 2,
  //           path: blobPaths[blobCount],
  //           id: blobCount,
  //           fill: 'orange',
  //           children: undefined,
  //         },
  //         {
  //           generation: newBlobs[id].generation + 1,
  //           size: newBlobs[id].size / 2,
  //           path: blobPaths[blobCount],
  //           id: blobCount + 1,
  //           fill: 'red',
  //           children: undefined,
  //         },
  //       ],
  //     },
  //   };

  //   setBlobs(newBlobs);

  //   setBlobCount((prev) => prev + 3);

  //   console.log('blobs', blobs);
  // }

  useEffect(() => console.log('child', blobs[0]?.children), [blobs, blobCount]);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => createBlob(blobCount)}>Click Me</button>
      <Container>
        {blobs.map((blob, i) => (
          <BlobContainer size={blob.size}>
            <Blob {...blob} children={blob.children} />
          </BlobContainer>
        ))}
      </Container>
    </>
  );
}

export default App;
