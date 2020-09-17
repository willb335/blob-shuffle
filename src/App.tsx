import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as blob from 'blobs/v2';

import { Blob, BlobProps } from './Blob';

export const BlobContainer = styled.div<{ size: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100vw;
  border: 2px solid green;
`;

function App() {
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
  const [fills] = useState<string[]>(['#D93F4C', '#337FBD', '#228F67']);

  useEffect(() => {
    createBlob([0.5, 0.5]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createBlob(odds: number[]): void {
    odds.forEach((odd, i) => {
      const createPath = (odd: number): string => {
        const seed = Math.random();
        return blob.svgPath({
          seed,
          extraPoints: 8,
          randomness: 4,
          size: odd * 100,
        });
      };

      const path = createPath(odd);
      const fill = fills[i];
      const size = odd * 100;
      setBlobs((prev) => [...prev, { path, size, fill }]);
    });
  }

  return (
    <>
      <Container>
        {blobs.map((blob, i) => {
          return (
            <BlobContainer key={blob.path} tabIndex={0} size={blob.size}>
              <Blob {...blob} />
            </BlobContainer>
          );
        })}
      </Container>
    </>
  );
}

export default App;
