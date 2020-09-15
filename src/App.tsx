import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blobs, BlobsProps } from './Blobs';
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
  const [blobPaths, setBlobPaths] = useState<string[]>([]);
  const [blobs, setBlobs] = useState<BlobsProps[]>([]);
  const [blobCount, setBlobCount] = useState(0);
  // const [blobSize, setBlobSize] = useState(32);
  // const [containerTotal, setContainerTotal] = useState(2);
  const [blobWorker, { status: blobWorkerStatus }] = useWorker(pathArray, {
    remoteDependencies: ['https://unpkg.com/blobs/v2'],
    autoTerminate: false,
  });

  useEffect(() => {
    async function runBlobCreation() {
      try {
        const result: string[] = await blobWorker(32, answer); // non-blocking UI
        setBlobPaths(result);
        createParentBlob(result);
      } catch (e) {
        console.log('error', e);
      }
    }

    function createParentBlob(blobPaths: string[]): void {
      setBlobs([
        {
          size: 32,
          path: blobPaths[0],
          id: 0,
          fill: 'green',
          generation: 1,
          children: undefined,
        },
      ]);
      setBlobCount((prev) => prev + 1);
    }

    runBlobCreation();
  }, [answer, blobWorker]);

  function createBlob(): void {
    setBlobs((prev) => {
      return [
        ...prev,
        {
          size: 32,
          path: blobPaths[blobCount],
          id: blobCount,
          fill: 'green',
          generation: 1,
          children: undefined,
        },
      ];
    });
    setBlobCount((prev) => prev + 1);
  }

  function splitBlob(e: SyntheticEvent, id: number): void {
    console.log('id', id);
    const newBlobs = blobs;
    newBlobs[id] = {
      ...newBlobs[id],
      ...{
        children: [
          {
            generation: newBlobs[id].generation + 1,
            size: newBlobs[id].size / 2,
            path: blobPaths[blobCount],
            id: blobCount,
            fill: 'orange',
            children: undefined,
          },
          {
            generation: newBlobs[id].generation + 1,
            size: newBlobs[id].size / 2,
            path: blobPaths[blobCount],
            id: blobCount + 1,
            fill: 'red',
            children: undefined,
          },
        ],
      },
    };

    setBlobs(newBlobs);

    setBlobCount((prev) => prev + 3);

    console.log('blobs', blobs);
  }

  useEffect(() => console.log('child', blobs[0]?.children), [blobs, blobCount]);

  return (
    <>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <button onClick={createBlob}>Click Me</button>
      <div>{blobWorkerStatus}</div>

      <Container>
        {/* {blobs.map((b, i) => {
          console.log('b', b);
          return (
            <BlobContainer key={b.id.toString()} size={32}> */}
        <Blobs {...blobs[0]} split={splitBlob} children={blobs[0]?.children} />
        {/* </BlobContainer>
          );
        })} */}
      </Container>
    </>
  );
}

export default App;
