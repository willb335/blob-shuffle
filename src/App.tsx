import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as blob from 'blobs/v2';

import { Blob, BlobProps } from './Blob';

export const BlobContainer = styled.div<{ size: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  margin: 2px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [blobs, setBlobs] = useState<BlobProps[]>([]);

  useEffect(() => {
    createBlob(200, 'gold');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createBlob(size: number, fill: string): void {
    const seed = Math.random();
    const path = blob.svgPath({
      seed,
      extraPoints: 8,
      randomness: 4,
      size,
    });

    setBlobs((prev) => [...prev, { path, size, fill }]);
  }

  return (
    <Container>
      {blobs.map((blob) => {
        return (
          <BlobContainer key={blob.path} size={blob.size} tabIndex={0}>
            <Blob {...blob} />
          </BlobContainer>
        );
      })}
    </Container>
  );
}

export default App;
