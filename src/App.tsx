import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blob } from './Blob';
import logo from './react.svg';

const BLOB_SIZE = 32;
const BLOB_COUNT = 100;

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  align-items: center;
`;

function App() {
  const [blobCount, setBlobCount] = useState(1000);
  const [blobSize, setBlobSize] = useState(16);
  const [blobPaths, setBlobPaths] = useState<string[]>([]);
  const [
    blobWorker,
    { status: blobWorkerStatus, kill: killBlobWorker },
  ] = useWorker(pathArray, {
    remoteDependencies: ['https://unpkg.com/blobs/v2'],
  });

  useEffect(() => {
    async function runBlobCreation() {
      try {
        console.log('Start.');

        const result: string[] = await blobWorker(blobSize, blobCount); // non-blocking UI
        console.log('End.', result);

        setBlobPaths(result);
        setBlobCount(50000);
        setBlobSize(8);
      } catch (e) {
        console.log('error', e);
      }
    }

    // if (blobWorkerStatus === WORKER_STATUS.PENDING) {
    runBlobCreation();
    // }
  }, [blobCount, blobSize, blobWorkerStatus, blobWorker]);

  return (
    <BlobContainer>
      <img src={logo} className="App-logo" alt="logo" />
      <button>Click Me</button>
      {blobWorkerStatus}
      {blobWorkerStatus === WORKER_STATUS.SUCCESS &&
        blobPaths.map(
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
