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
  margin: 20px;
  outline: 1px solid gold;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100vw;
  border: 1px solid mistyrose;
`;

function App() {
  const [size, setSize] = useState(100);
  const [blobs, setBlobs] = useState<BlobProps[]>([]);
  const [fills] = useState<string[]>(['#D93F4C', '#337FBD', '#228F67']);
  const [odds] = useState<number[]>([0.25, 0.75]);

  useEffect(() => {
    odds.forEach((odd, i) => createBlob(odd, fills[i]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createBlob(odd: number, fill: string): void {
    const size = (odd: number): number => {
      return Math.sqrt(odd * 10000);
    };
    const createPath = (odd: number): string => {
      const seed = Math.random();
      return blob.svgPath({
        seed,
        extraPoints: 8,
        randomness: 4,
        size: size(odd),
      });
    };

    if (odd >= 0.5) {
      setSize(size(odd));
    }

    setBlobs((prev) => [
      ...prev,
      { path: createPath(odd), size: size(odd), fill, odd },
    ]);
  }

  return (
    <Container>
      {blobs.map((blob, i) => {
        return (
          <BlobContainer key={blob.path} tabIndex={0} size={size}>
            <Blob key={i} {...blob} />
          </BlobContainer>
        );
      })}
    </Container>
  );
}

export default App;
