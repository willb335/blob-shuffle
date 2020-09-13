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

const BLOB_COUNT = 10;
const BLOB_SIZE = 8;

function App() {
  return (
    <BlobContainer>
      {Array.from(Array(BLOB_COUNT)).map((_, i) => {
        const seed = Math.random();
        const svgPath = blobs.svgPath({
          seed,
          extraPoints: 8,
          randomness: 4,
          size: BLOB_SIZE,
        });

        return (
          <Blob
            height={BLOB_SIZE}
            width={BLOB_SIZE}
            path={svgPath}
            fill="#FF0066"
            key={seed + i}
          />
        );
      })}
    </BlobContainer>
  );
}

export default App;
