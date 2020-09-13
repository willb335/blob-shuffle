import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blob } from './Blob';
import logo from './react.svg';

const BLOB_SIZE = 8;
const BLOB_COUNT = 30000;

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  align-items: center;
`;

function App() {
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

        const result: string[] = await blobWorker(BLOB_SIZE, BLOB_COUNT); // non-blocking UI
        console.log('End.', result);

        setBlobPaths(result);
      } catch (e) {
        console.log('error', e);
      }
    }

    runBlobCreation();
  }, []);

  useEffect(() => {
    console.log(blobWorkerStatus);
  }, [blobWorkerStatus]);

  useEffect(() => {
    if (blobPaths.length > 0) console.log('blobPaths update');
  }, [blobPaths]);

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
              width={BLOB_SIZE}
              height={BLOB_SIZE}
              fill={'pink'}
            />
          )
        )}
    </BlobContainer>
  );
}

export default App;
