import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blob, BlobProps } from './Blob';
import logo from './react.svg';

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }: { size: number }) => size && `${size}px`};
  height: ${({ size }: { size: number }) => size && `${size}px`};
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
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
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
          path: blobPaths[blobCount],
          id: blobCount,
          fill: 'green',
          generation: 1,
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
        },
      ];
    });
    setBlobCount((prev) => prev + 1);
  }

  function splitBlob(e: SyntheticEvent, id: number): void {
    setBlobCount((prev) => prev + 1);

    console.log('blobs', blobs);
  }

  return (
    <>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <button onClick={createBlob}>Click Me</button>
      <div>{blobWorkerStatus}</div>

      <Container>
        {blobs.map((b, i) => {
          console.log('b', b);
          return (
            <BlobContainer key={b.id.toString()} size={32}>
              {Array.from(Array(b.generation)).map((_, j) => (
                <Blob
                  key={b.id.toString()}
                  {...b}
                  fill={b.id === i ? 'red' : b.fill}
                  split={splitBlob}
                />
              ))}
            </BlobContainer>
          );
        })}
      </Container>
    </>
  );
}

export default App;
