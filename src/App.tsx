import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blob } from './Blob';
import logo from './react.svg';

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  align-items: center;
`;

function App() {
  const [blobCount, setBlobCount] = useState(500);
  const [blobSize, setBlobSize] = useState(32);
  const [blobPaths, setBlobPaths] = useState<string[]>([]);
  const [
    blobWorker,
    { status: blobWorkerStatus, kill: killBlobWorker },
  ] = useWorker(pathArray, {
    remoteDependencies: ['https://unpkg.com/blobs/v2'],
    autoTerminate: false,
  });
  const [
    blobWorker2,
    { status: blobWorker2Status, kill: killBlobWorker2 },
  ] = useWorker(pathArray, {
    remoteDependencies: ['https://unpkg.com/blobs/v2'],
    autoTerminate: false,
  });

  useEffect(() => {
    async function runBlobCreation() {
      try {
        console.log('blobWorkerStatus', blobWorkerStatus);
        const result: string[] = await blobWorker(blobSize, blobCount); // non-blocking UI
        console.log('blobWorkerStatus', blobWorkerStatus);

        setBlobPaths(result);
        killBlobWorker();
      } catch (e) {
        console.log('error', e);
      }
    }

    if (
      blobWorkerStatus === WORKER_STATUS.PENDING ||
      blobWorkerStatus === WORKER_STATUS.SUCCESS
    ) {
      runBlobCreation();
    }
  }, [
    blobCount,
    blobSize,
    blobWorker2Status,
    blobWorker,
    blobWorkerStatus,
    killBlobWorker,
  ]);

  useEffect(() => {
    async function runBlobCreation() {
      try {
        console.log('blobWorker2Status', blobWorker2Status);

        const result: string[] = await blobWorker2(blobSize, blobCount); // non-blocking UI
        console.log('blobWorker2Status', blobWorker2Status);

        setBlobPaths(result);

        killBlobWorker2();
      } catch (e) {
        console.log('error', e);
      }
    }

    if (
      blobWorker2Status === WORKER_STATUS.PENDING ||
      blobWorker2Status === WORKER_STATUS.SUCCESS
    ) {
      runBlobCreation();
    }
  }, [
    blobCount,
    blobSize,
    blobWorkerStatus,
    blobWorker2,
    blobWorker2Status,
    killBlobWorker2,
  ]);

  useEffect(() => {
    console.log('blobSize', blobSize, 'blobCount', blobCount);
    console.log(
      'blobWorkerStatus',
      blobWorkerStatus,
      'blobWorker2Status',
      blobWorker2Status
    );
  }, [blobSize, blobCount]);

  useEffect(() => {
    if (blobCount <= 15000) {
      setBlobSize((prev) => prev);
      setBlobCount((prev) => prev * 2);
    }
  }, [blobPaths, blobCount]);

  return (
    <BlobContainer>
      <img src={logo} className="App-logo" alt="logo" />
      <button>Click Me</button>
      {blobWorkerStatus}
      {blobWorker2Status}

      {blobPaths.map(
        (path: string, index: number): JSX.Element => (
          <Blob
            key={index}
            path={path}
            width={blobSize}
            height={blobSize}
            fill={'pink'}
          />
        )
      )}
    </BlobContainer>
  );
}

export default App;
