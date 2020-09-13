import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWorker, WORKER_STATUS } from '@koale/useworker';

import { pathArray } from './worker';
import { Blob } from './Blob';

const BLOB_SIZE = 8;

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  align-items: center;
`;

function App() {
  const [blobPaths, setBlobPaths] = useState<string[]>([]);
  const [blobWorker, blobWorkerStatus] = useWorker(pathArray, {
    remoteDependencies: ['https://unpkg.com/blobs/v2'],
  });

  useEffect(() => {
    async function runBlobCreation() {
      try {
        const result: string[] = await blobWorker(BLOB_SIZE); // non-blocking UI
        setBlobPaths(result);
        console.log('End.', result);
      } catch (e) {
        console.log('error', e);
      }
    }

    runBlobCreation();
  }, [blobWorker]);

  return (
    <BlobContainer>
      <button>Click Me</button>
      {blobWorkerStatus.status}
      {blobWorkerStatus.status === 'SUCCESS' &&
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
