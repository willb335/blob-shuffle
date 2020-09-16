import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  split?: Function;
  id: string;
  generation: number;
  children: BlobProps[] | undefined;
  index: number;
}

const BlobContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }: { size: number }) => size && `${size}px`};
  height: ${({ size }: { size: number }) => size && `${size}px`};
  /* border: 2px solid orange; */
`;

export const Blob: FunctionComponent<BlobProps> = ({
  size,
  path,
  fill,
  split,
  id,
  generation,
  children,
  index,
}) => {
  console.log('blob', id, generation);
  return children?.length ? (
    <>
      {children.map((blob, i) => {
        console.log(blob);
        return (
          <BlobContainer key={blob.id} size={blob.size}>
            <Blob {...blob} index={i} split={split} />
          </BlobContainer>
        );
      })}
    </>
  ) : (
    <svg width={size} height={size}>
      <path d={path} fill={fill} onClick={() => split && split(index)} />
    </svg>
  );
};
