import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
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

export const Blob: FunctionComponent<BlobProps> = (props) => {
  return props.children ? (
    <>
      {props.children.map((blob, i) => {
        return (
          <BlobContainer key={blob.id} size={blob.size}>
            <Blob {...blob} index={props.index} />
          </BlobContainer>
        );
      })}
    </>
  ) : (
    <svg width={props.size} height={props.size}>
      <path d={props.path} fill={props.fill} />
    </svg>
  );
};
