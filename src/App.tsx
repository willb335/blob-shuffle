import React, { useState } from 'react';
import styled from 'styled-components';
import * as blobs2 from 'blobs/v2';

import { Blob } from './Blob';

const svgPath = (size: number): string =>
  blobs2.svgPath({
    seed: Math.random(),
    extraPoints: 8,
    randomness: 4,
    size,
  });

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }: { size: number }) => size && `${size}px`};
  height: ${({ size }: { size: number }) => size && `${size}px`};
`;

function App() {
  const [blobSize, setBlobSize] = useState(64);
  return (
    <BlobContainer size={blobSize}>
      <Blob
        height={blobSize}
        width={blobSize}
        fill={'#FF0066'}
        path={svgPath(blobSize)}
      />
    </BlobContainer>
  );
}

export default App;
