import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blob } from './Blob';
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

interface Blob {
  size: number;
  children: Blob[];
  path: string;
  id: string;
  fill: string;
}

function App() {
  const [answer, setAnswer] = useState(10000);
  const [blobPaths, setBlobPaths] = useState<string[]>([]);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  // const [blobCount, setBlobCount] = useState(2);
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
          children: [],
          path: blobPaths[0],
          id: blobPaths[0],
          fill: 'green',
        },
      ]);
    }

    runBlobCreation();
  }, [answer, blobWorker]);

  const split = (e: SyntheticEvent, index: number): void => {
    console.log('e.target', e.target);
  };

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <button>Click Me</button>
      <div>{blobWorkerStatus}</div>

      <Container>
        {blobs.map((b, i) => {
          return (
            <BlobContainer key={b.id + i} size={b.size}>
              <Blob {...b} />
            </BlobContainer>
          );
        })}
      </Container>
    </>
  );
}

export default App;
