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
  const [blobCount, setBlobCount] = useState(10000);
  const [blobSize, setBlobSize] = useState(32);
  const [blobPaths, setBlobPaths] = useState<string[]>([]);
  const [blobWorker, { status: blobWorkerStatus }] = useWorker(pathArray, {
    remoteDependencies: ['https://unpkg.com/blobs/v2'],
    autoTerminate: false,
  });

  useEffect(() => {
    async function runBlobCreation() {
      try {
        const result: string[] = await blobWorker(blobSize, blobCount); // non-blocking UI
        setBlobPaths(result);
      } catch (e) {
        console.log('error', e);
      }
    }

    runBlobCreation();
  }, [blobCount, blobSize, blobWorker]);

  return (
    <BlobContainer>
      <img src={logo} className="App-logo" alt="logo" />
      <button>Click Me</button>
      {blobWorkerStatus}
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
