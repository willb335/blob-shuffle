import React from 'react';
import styled from 'styled-components';

import { Blob } from './Blob';

import * as blobs from 'blobs/v2';

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  align-items: center;
`;

const BLOB_COUNT = 100000;

function App() {
  return (
    <BlobContainer>
      {Array.from(Array(BLOB_COUNT)).map((_, i) => {
        const svgPath = blobs.svgPath({
          seed: Math.random(),
          extraPoints: 8,
          randomness: 4,
          size: 32,
        });

        return <Blob height={32} width={32} path={svgPath} fill="#FF0066" />;
      })}
    </BlobContainer>
  );
}

export default App;
